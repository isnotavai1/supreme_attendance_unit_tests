from deepface import DeepFace
import cv2
img1 = cv2.imread("img2.jpeg")
img2 = cv2.imread("img6.jpeg")
result = DeepFace.verify(img1 , img2 , model_name='Facenet')
print(result)

