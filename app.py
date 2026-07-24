from flask import Flask, render_template

app = Flask(__name__)

PORTFOLIO_PROJECTS = [
    {
        'id': 1,
        'name': 'ProjectHub',
        'description': 'A full-stack project management hub where users can register, log in, and manage their development projects with a clean dashboard interface.',
        'link': 'https://projecthub-frontend-c3v9.onrender.com'
    },
    {
        'id': 2,
        'name': 'Online Classroom Platform',
        'description': 'A platform for online learning and collaboration between students and educators.',
        'link': 'https://github.com/Yuvraj686/Online-Classroom-Platform'
    },
    {
        'id': 3,
        'name': 'Drive Dreams',
        'description': 'A passion project for F1 lovers — exploring the dreams, data, and drama behind Formula 1 racing.',
        'link': 'https://github.com/Yuvraj686/Drive-Dreams'
    },
    {
        'id': 4,
        'name': 'Portfolio Website',
        'description': 'A personal portfolio website built with Flask to showcase my projects, skills, and resume.',
        'link': 'https://github.com/Yuvraj686/Portfolio-Website-'
    }
]

@app.route('/')
def home():
    return render_template('home.html', projects=PORTFOLIO_PROJECTS, title='My Portfolio')

@app.route('/resume')
def index():
    pdf_filename = 'Resume.pdf'
    return render_template('home.html', pdf_filename=pdf_filename)
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
