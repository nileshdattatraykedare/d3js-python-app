import json

from backend.datasource import DataSource
from flask import Flask, render_template

dataSource = DataSource('./sample.json')


def server(static_path, folder_path):
    app = Flask(__name__, static_folder=static_path, template_folder=folder_path)

    @app.route('/')
    def index():
        return render_template('test.html')

    @app.route('/get_chart_data')
    def get_chart_data():
        data = dataSource.get_data()['aggregations']['audits_over_time']
        return json.dumps(data)

    if __name__ == '__main__':
        app.run(debug=False)


server('static', 'frontend')
