import json


class DataSource:
    def __init__(self, data_source_path):
        self.data_source_path = data_source_path
        self.data = ''

    def get_data(self):
        with open(self.data_source_path, 'r') as f:
            self.data = json.load(f)
            return self.data
