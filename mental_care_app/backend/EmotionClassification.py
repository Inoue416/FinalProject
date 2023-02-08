from asari.api import Sonar

class EmotionClassification():
    def __init__(self):
        self.sonar = Sonar()
        self.positive = 0
        self.negative = 0
    
    def classification(self, text):
        if text == "":
            return None
        result = self.sonar.ping(text=text)["classes"]
        try:
            for value in result:
                if value["class_name"] == 'positive':
                    self.positive = value['confidence']
                    continue
                self.negative = value['confidence']
            return True
        except:
            return None