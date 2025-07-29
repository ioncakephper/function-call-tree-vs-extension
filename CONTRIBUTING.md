# Contributing to JS Starter Template

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

First off, thank you for considering contributing! We welcome any and all contributions that help make this project better.

This document provides guidelines for contributing to the project. Please read it carefully to ensure a smooth and effective collaboration process.

## 💬 How to Contribute

- **Reporting Bugs**: If you find a bug, please open an issue and provide a detailed description, including steps to reproduce it.
- **Suggesting Enhancements**: If you have an idea for a new feature or an improvement, please open an issue to discuss it first.
- **Submitting Pull Requests**: If you'd like to contribute code, please follow the steps below.

## 🚀 Pull Request Process

1. **Fork the Repository**
   - Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**
   - Clone your forked repository to your local machine:

     ```bash
     git clone https://github.com/YOUR_USERNAME/js-starter.git
     ```

3. **Install Dependencies**
   - Navigate to the project directory and install the required dependencies:

     ```bash
     npm install
     ```

4. **Create a New Branch**
   - Create a new branch for your feature or bug fix. Use a descriptive name.

     ```bash
     git checkout -b feature/your-new-feature
     ```

5. **Make Your Changes**
   - Write your code and add any necessary tests.

6. **Ensure Code Quality**
   - Before committing, run the `ready` script. This single command will format your code, fix linting issues, and update all auto-generated documentation sections in the `README.md` (Table of Contents, Project Structure, and Available Scripts).

     ```bash
     npm run ready
     ```

   - Ensure all tests still pass:

     ```bash
     npm test
     ```

7. **Commit Your Changes**
   - Commit your changes using a descriptive commit message that follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This is crucial as it allows for automated changelog generation.

     ```bash
     git commit -m "feat: Add your new feature"
     ```

   - The basic format is `<type>: <description>`. Common types include:
     - `feat`: A new feature
     - `fix`: A bug fix
     - `docs`: Documentation only changes
     - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
     - `refactor`: A code change that neither fixes a bug nor adds a feature
     - `perf`: A code change that improves performance
     - `test`: Adding missing tests or correcting existing tests
     - `chore`: Changes to the build process or auxiliary tools and libraries

8. **Push to Your Fork**
   - Push your changes to your forked repository.

     ```bash
     git push origin feature/your-new-feature
     ```

9. **Open a Pull Request**
   - Go to the original repository and open a pull request. Provide a detailed description of the changes you've made.

Thank you for your contribution!
