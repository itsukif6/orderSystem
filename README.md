This project is using React for frontend, Flask for backend and sqlite3 for database.
It's only a demo version, not yet all function can use completely.

Written by Niko Tsai.As known ad 高雄師範大學 軟體工程學系 411077010 蔡岳哲。

How to open:
  
  1)frontend module:
  cd to frontend/src and use npm i(or other equally effective command) to download npm module that i used.
  
  2)backend build venv:
  !!!Recommend to use vnev:
  To build venv: 
  cd to backend/orderSystemVenv and use command: python -m venv orderSystemVenv
  (may be wrong, please reference: https://docs.python.org/3/library/venv.html)
  
  3)Activate Venv and backend module download:
  cd to backend/orderSystemVenv and Scripts/Activate.ps1
  Then use pip install -r requirements.txt to download my module for back end.
  
  4)open project:
    1. cd to frontend/src and command npm start
    2. cd to backend/orderSystemVenv and command flask run
