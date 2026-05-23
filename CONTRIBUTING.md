# Contributing to Protordk

First off, thanks for taking the time to contribute! ❤️

The following is a set of guidelines for contributing to Protordk. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the [issue list](https://github.com/dharshananand4/Protordk/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, Python version, etc.)

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as [GitHub issues](https://github.com/dharshananand4/Protordk/issues). When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the Python/JavaScript styleguides
* Include appropriate test cases
* Document new code with docstrings
* End all files with a newline

## Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/Protordk.git
   cd Protordk
   ```

3. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Make your changes**

7. **Test your changes**
   ```bash
   python -m pytest tests/
   ```

8. **Commit your changes**
   ```bash
   git commit -am 'Add some feature'
   ```

9. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

10. **Submit a Pull Request**

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Python Styleguide

Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)

* Use 4 spaces for indentation
* Use double quotes for strings
* Include docstrings for all functions
* Keep lines under 100 characters

### JavaScript Styleguide

* Use 4 spaces for indentation
* Use `const` and `let` instead of `var`
* Use single quotes for strings
* Include comments for complex logic

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested

## Recognition

Contributors will be recognized in:
* README.md
* Release notes
* Contributors list

---

Thank you for contributing to Protordk! 🎉
