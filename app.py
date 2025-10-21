from flask import Flask, render_template

app = Flask(__name__)

PORTFOLIO_PROJECTS = [
    {
        'id': 1,
        'name': 'Online Classroom Platform',
        'description': 'A platform for online learning and collaboration'},
    {
        'id': 2,
        'name': 'Drive Dreams',
        'description': 'This contains dreams for f1 lovers'},
    {
        'id': 3,
        'name': 'Portfolio Website',
        'description': 'A personal portfolio website to showcase my projects and skills.'
    }
]

@app.route('/')
def home():
    return render_template('home.html', projects=PORTFOLIO_PROJECTS, title='My Portfolio')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
