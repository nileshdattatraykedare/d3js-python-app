import json

from backend.datasource import DataSource
from flask import Flask, render_template
from flask_cors import CORS

dataSource = DataSource('./sample.json')


def server(static_path, folder_path):
    app = Flask(__name__, static_folder=static_path, template_folder=folder_path)
    CORS(app)

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/get_chart_data')
    def get_chart_data():
        return prepare_chart_data()

    # prepare_chart_data
    # sample data structure
    # renaming each batch of people in each DE_ADDRESS with common labels such label1, label2....
    # [
    #    {
    #  "DATE": "2019-01-05T09:00:00.000Z", "label1": "6", "OTHERS": "95", "label2": "5", "label3": "4",
    #  "label4": "4", "label5": "4", "label6": "4", "label7": "4", "label8": "4", "label9": "3", "label10": "3"
    #    },
    #    {
    # "DATE": "2019-01-05T10:00:00.000Z", "label1": "8", "OTHERS": "143", "label2": "6", "label3": "6",
    # "label4": "5", "label5": "5", "label6": "5", "label7": "5", "label8": "4", "label9": "4", "label10": "4"
    #    }
    # ]

    def prepare_chart_data():

        data = dataSource.get_data()['aggregations']['audits_over_time']['buckets']
        chart_list = []
        for record in data:
            for v in record:
                buckets = []

                date_of_each_bucket = record['key_as_string']

                if isinstance(record[v], dict):
                    b = {}
                    b.update({'DATE': date_of_each_bucket, 'buckets': record[v]['buckets']})
                    buckets.append(b)
                for bucket in buckets:
                    prepare_each_object_by_datetime(bucket, chart_list)
        return json.dumps(chart_list)

    def prepare_each_object_by_datetime(bucket, chart_list):
        date_of_bucket = bucket['DATE']
        containers = []
        for value in bucket['buckets']:
            if value['key'] == 'DE_ADDRESS':
                containers.append(value['by_user']['buckets'])
        chart_dict = {}
        for k in containers:
            i = 1
            for l in k:
                chart_dict.update({'DATE': date_of_bucket, "label" + str(i): str(l['doc_count']),
                                   'OTHERS': str(value['by_user']['sum_other_doc_count'])})
                i = i + 1
        chart_list.append(chart_dict)

    if __name__ == '__main__':
        app.run(debug=False)


server('static', 'frontend')
