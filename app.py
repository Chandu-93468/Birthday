from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/memories')
def memories():
    return render_template('memories.html')

@app.route('/analytics')
def analytics():
    return render_template('analytics.html', favorite_human="BADAM SRAVYA")

@app.route('/surprise')
def surprise():
    return render_template('surprise.html')

if __name__ == '__main__':
    # Running on port 5001 to avoid conflicts with your other app
    app.run(debug=True, port=5001)
