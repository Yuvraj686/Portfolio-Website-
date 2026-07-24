from flask import Flask, render_template
import os

app = Flask(__name__)

# ── Skills ──────────────────────────────────────────────────────────────────
SKILLS = [
    {
        'category': 'Languages',
        'icon': 'fa-code',
        'skill_list': ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'C++']
    },
    {
        'category': 'Frameworks & Libraries',
        'icon': 'fa-puzzle-piece',
        'skill_list': ['Flask', 'React', 'Bootstrap', 'Jinja2', 'REST APIs']
    },
    {
        'category': 'Databases',
        'icon': 'fa-database',
        'skill_list': ['MongoDB', 'SQLite', 'MySQL']
    },
    {
        'category': 'Tools & Platforms',
        'icon': 'fa-wrench',
        'skill_list': ['Git', 'GitHub', 'VS Code', 'Postman', 'Render', 'Linux']
    }
]

# ── Experience ───────────────────────────────────────────────────────────────
EXPERIENCE = [
    {
        'role': 'Backend Development Intern',
        'company': 'Destm Technologies',
        'duration': 'Jun 2026 – Jul 2026',
        'type': 'Internship',
        'location': 'On-site',
        'achievements': [
            'Contributed to a web-based chat application, building REST APIs with Python/FastAPI and implementing one-to-one and group chat features on a React.js, JavaScript, and React Router front end.',
            'Implemented JWT-based authentication and worked hands-on with MongoDB for data storage and management across the application.',
            'Worked under a senior full-stack developer across both backend and frontend tasks, maintaining consistent code quality and responsibility on all assigned work.'
        ]
    },
    {
        'role': 'Software Developer Intern',
        'company': 'Prodigy InfoTech',
        'duration': 'Jul 2025 – Aug 2025',
        'type': 'Internship',
        'location': 'Remote',
        'achievements': [
            'Designed and shipped 10+ production REST API endpoints in Python (FastAPI/Flask), improving data retrieval response times and enabling new front-end features.',
            'Integrated JWT-based authentication across multiple endpoints, ensuring secure, role-scoped access to protected resources.',
            'Collaborated in an agile team of 5 engineers — participated in daily stand-ups, code reviews, and bi-weekly sprint planning using Git branching workflows.'
        ]
    }
]

# ── Currently Learning ────────────────────────────────────────────────────────
CURRENTLY_LEARNING = ['Docker', 'System Design', 'PostgreSQL']

# ── Projects ──────────────────────────────────────────────────────────────────
PORTFOLIO_PROJECTS = [
    {
        'id': 1,
        'name': 'ProjectHub',
        'description': 'A full-stack project management hub where users can register, log in, and manage their development projects with a clean dashboard interface.',
        'full_description': 'ProjectHub is a full-stack web application that provides developers with a centralised platform to register, authenticate, and manage their projects. It features a responsive dashboard, user-specific project isolation, and a clean UI designed for productivity. The backend exposes a RESTful API consumed by the decoupled frontend, demonstrating a production-grade separation of concerns.',
        'project_structure': 'Decoupled architecture: React/JS frontend deployed on Render, Flask REST API backend, MongoDB for document-based data persistence, JWT-based stateless authentication.',
        'tech_stack': ['Python', 'Flask', 'JavaScript', 'React', 'MongoDB', 'REST API', 'JWT'],
        'link': 'https://projecthub-frontend-c3v9.onrender.com'
    },
    {
        'id': 2,
        'name': 'Online Classroom Platform',
        'description': 'A platform for online learning and collaboration between students and educators.',
        'full_description': 'An end-to-end web platform that bridges students and educators through a structured online learning environment. The system supports course creation, assignment management, and student enrollment workflows. Role-based access control separates educator and student capabilities, and the application follows an MVC pattern throughout.',
        'project_structure': 'Flask MVC application: route handlers, Jinja2 HTML templates, SQLite relational database for users/courses/assignments, Bootstrap-based responsive frontend.',
        'tech_stack': ['Python', 'Flask', 'Jinja2', 'HTML', 'CSS', 'JavaScript', 'SQLite', 'Bootstrap'],
        'link': 'https://github.com/Yuvraj686/Online-Classroom-Platform'
    },
    {
        'id': 3,
        'name': 'Drive Dreams',
        'description': 'A passion project for F1 lovers — exploring the dreams, data, and drama behind Formula 1 racing.',
        'full_description': 'Drive Dreams is an interactive web experience built for Formula 1 enthusiasts, combining motorsport data with a visually rich UI. The project explores driver stats, race history, and the culture surrounding F1. It demonstrates data-driven front-end rendering served through a lightweight Flask backend.',
        'project_structure': 'Flask backend serving server-rendered Jinja2 templates, static data files for F1 content, custom CSS for the themed UI, modular template structure.',
        'tech_stack': ['Python', 'Flask', 'Jinja2', 'HTML', 'CSS', 'JavaScript'],
        'link': 'https://github.com/Yuvraj686/Drive-Dreams'
    },
    {
        'id': 4,
        'name': 'Portfolio Website',
        'description': 'A personal portfolio website built with Flask to showcase my projects, skills, and resume.',
        'full_description': 'This portfolio site is a single-page Flask application showcasing projects, an about section, and a contact form. It features smooth-scroll navigation, a project detail modal, dark mode, scroll-reveal animations, and a downloadable resume. Project data is managed server-side in Python and injected into Jinja2 templates at render time.',
        'project_structure': 'Flask app with a single route rendering a Jinja2 template, static assets (CSS/JS/PDF), project data defined in Python, vanilla JS for interactivity (modal, dark mode, scroll-reveal, form handling).',
        'tech_stack': ['Python', 'Flask', 'Jinja2', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        'link': 'https://github.com/Yuvraj686/Portfolio-Website-'
    }
]


@app.route('/')
def home():
    return render_template(
        'home.html',
        projects=PORTFOLIO_PROJECTS,
        skill_groups=SKILLS,
        experience=EXPERIENCE,
        currently_learning=CURRENTLY_LEARNING,
        title='My Portfolio'
    )


@app.route('/resume')
def resume():
    return render_template('home.html', pdf_filename='Resume.pdf',
                           projects=PORTFOLIO_PROJECTS, skill_groups=SKILLS,
                           experience=EXPERIENCE,
                           currently_learning=CURRENTLY_LEARNING,
                           title='My Portfolio')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', 'False') == 'True'
    app.run(host='0.0.0.0', debug=debug_mode)
