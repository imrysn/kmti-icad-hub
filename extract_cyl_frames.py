import cv2
import os

os.makedirs('C:/Users/Cat/.gemini/antigravity-ide/brain/90748ae7-e674-422d-ac12-2bc2efe215a6/scratch/cyl_frames', exist_ok=True)
cap = cv2.VideoCapture('frontend/src/assets/3D_Video_Tutorial/basicOp_cylinder.mp4')

html = '<html><style>img { width: 300px; margin: 5px; } div { display: inline-block; text-align: center; font-family: sans-serif; }</style><body>'

for i in range(0, 100):
    time_sec = i * 0.25
    cap.set(cv2.CAP_PROP_POS_MSEC, time_sec * 1000)
    ret, frame = cap.read()
    if not ret: break
    filename = f'cyl_{time_sec:.2f}.jpg'
    filepath = os.path.join('C:/Users/Cat/.gemini/antigravity-ide/brain/90748ae7-e674-422d-ac12-2bc2efe215a6/scratch/cyl_frames', filename)
    cv2.imwrite(filepath, frame)
    html += f'<div><img src="cyl_frames/{filename}"><br>{time_sec:.2f}s</div>\n'

html += '</body></html>'
with open('C:/Users/Cat/.gemini/antigravity-ide/brain/90748ae7-e674-422d-ac12-2bc2efe215a6/scratch/cylinder_frames.html', 'w') as f:
    f.write(html)
