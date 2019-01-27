import json

from backend.datasource import DataSource
dataSource = DataSource('./sample.json')

data = dataSource.get_data()['aggregations']['audits_over_time']['buckets']
# print(data)
chartList = []
names = []

for record in data:
    for v in record:
        buckets = []
        # print(record)
        # print('\n')
        dateOfEachBucket = record['key_as_string']
        # print(dateOfEachBucket)
        if isinstance(record[v], dict):
            b = {}
            b.update({'DATE': dateOfEachBucket, 'buckets': record[v]['buckets']})
            buckets.append(b)
        for bucket in buckets:
            dateOfBucket = bucket['DATE']
            # print('\n')
            containers = []
            for value in bucket['buckets']:
                if value['key'] == 'DE_ADDRESS':
                    # print(value)
                    # print(value['by_user']['sum_other_doc_count'])
                    # print('\n')
                    containers.append(value['by_user']['buckets'])
            chartDict = {}

            for k in containers:
                for l in k:
                    names.append(l['key'])
                    chartDict.update({'DATE': dateOfBucket, l['key']: str(l['doc_count']),
                                      'OTHERS': str(value['by_user']['sum_other_doc_count']),
                                     })

            chartList.append(chartDict)


print(json.dumps({'NAMES': list(set(names)), 'DATA': chartList}))

