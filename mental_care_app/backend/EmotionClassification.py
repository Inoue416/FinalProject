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
                    self.positive = round(value['confidence'], 2)
                    continue
                self.negative = round(value['confidence'], 2)
            return True
        except:
            return None

# if __name__ == "__main__":
#     cltr = EmotionClassification()
#     cltr.classification("今日は最悪な日だ。何もかも嫌になる。")
#     print(cltr.positive, cltr.negative)