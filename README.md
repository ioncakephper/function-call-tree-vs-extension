# JS Starter Template

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md) [![Build Status](https://github.com/ioncakephper/js-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/ioncakephper/js-starter/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/ioncakephper/js-starter/branch/main/graph/badge.svg)](https://codecov.io/gh/ioncakephper/js-starter) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Changelog](https://img.shields.io/badge/changelog-keep_a_changelog-blue.svg)](CHANGELOG.md)

A robust starter template for modern Node.js development, pre-configured with Jest for testing, ESLint for linting, and Prettier for code formatting.

This project provides a solid foundation for building high-quality JavaScript applications, ensuring code consistency and best practices from the start.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## 📚 Table of Contents

- [✨ Key Features](#-key-features)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Using this Template](#using-this-template)
    - [Method 1: GitHub Template (Recommended)](#method-1-github-template-recommended)
    - [Method 2: Using `degit` (for a local copy)](#method-2-using-degit-for-a-local-copy)
- [🚀 Available Scripts](#-available-scripts)
  - [Automated Documentation](#automated-documentation)
  - [Code Quality & Formatting](#code-quality--formatting)
  - [Core Development](#core-development)
  - [The "One-Click" Pre-Commit Workflow](#the-one-click-pre-commit-workflow)
- [A Focus on Quality and Productivity](#a-focus-on-quality-and-productivity)
  - [The Cost of Stale Documentation](#the-cost-of-stale-documentation)
  - [The Power of Workflow Scripts](#the-power-of-workflow-scripts)
- [📦 Release & Versioning](#-release--versioning)
  - [How it Works](#how-it-works)
  - [Creating a New Release](#creating-a-new-release)
    - [Your First Release](#your-first-release)
- [📁 Project Structure](#-project-structure)
- [✍️ Linting for Documentation](#-linting-for-documentation)
  - [How to Check for Missing Documentation](#how-to-check-for-missing-documentation)
  - [Example](#example)
- [🤝 Contributing](#-contributing)
- [🗺️ Roadmap](#-roadmap)
- [⚖️ Code of Conduct](#-code-of-conduct)
- [🙏 Acknowledgements](#-acknowledgements)
- [👨‍💻 About the Author](#-about-the-author)
- [📄 License](#-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ✨ Key Features

- **Comprehensive Testing Suite**: Pre-configured with Jest for unit and integration testing. Includes coverage reporting out-of-the-box to ensure code quality.
- **Automated Code Quality**: A strict, pre-configured setup using ESLint and Prettier to catch errors, enforce best practices, and maintain a consistent code style across all files (`.js`, `.md`, `.json`).
- **Enforced Documentation Standards**: Integrated `eslint-plugin-jsdoc` to require JSDoc comments for all functions, improving code clarity and long-term maintainability.
- **Living Documentation**: Custom automation scripts (`npm run docs:all`) that keep your `README.md` perpetually up-to-date by generating the project structure, a table of contents, and a list of available scripts. This eliminates documentation drift.
- **Automated Release Workflow**: Integrated `release-please` to automate version bumping, `CHANGELOG.md` generation, and GitHub releases based on the Conventional Commits specification.
- **One-Command Pre-Commit Preparation**: A single `npm run ready` command that formats, lints, and updates all documentation, guaranteeing every commit is clean, consistent, and professional. This command is designed to be run before every commit.
- **Robust Project Defaults**: Thoughtfully pre-configured with `.gitignore`, `.prettierignore`, and a ready-to-use Continuous Integration (CI) workflow for GitHub Actions.
- **Automated Dependency Updates**: Dependabot integration to keep your dependencies up-to-date and secure.

## 🚀 Getting Started

### Prerequisites

- Node.js version 18.0.0 or higher

### Using this Template

There are two recommended ways to use this template to start your project.

#### Method 1: GitHub Template (Recommended)

This is the best approach for creating a new repository on GitHub that is linked to this template.

1.  Click the green **"Use this template"** button on the [main repository page](https://github.com/ioncakephper/js-starter).
2.  Select **"Create a new repository"**.
3.  Give your new repository a name and description, then create it.
4.  Clone your newly created repository to your local machine, replacing `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME`:
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    ```
5.  Navigate into the project directory and install the dependencies:
    ```bash
    cd YOUR_REPOSITORY_NAME
    npm install
    ```
6.  You're all set! Start building your application in the `src` directory.

#### Method 2: Using `degit` (for a local copy)

If you want a clean copy of the template files on your local machine without the full Git history, you can use `degit`.

1.  Run the following command in your terminal, replacing `my-new-project` with your desired folder name:
    ```bash
    npx degit ioncakephper/js-starter my-new-project
    ```
2.  Navigate into your new project directory and install the dependencies:
    ```bash
    cd my-new-project
    npm install
    ```
3.  You're all set! You can now initialize a new Git repository (`git init`) and start building.

## 🚀 Available Scripts

This template includes a set of scripts designed to streamline development, enforce quality, and automate documentation.

<!-- START AVAILABLE SCRIPTS -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN npm run docs:scripts TO UPDATE -->

### Automated Documentation

- `npm run docs:all`: A convenience script that updates all documentation sections: table of contents, available scripts, and project structure.
- `npm run docs:scripts`: Updates the "Available Scripts" section in `README.md` with this script.
- `npm run docs:structure`: Updates the project structure tree in `README.md`.
- `npm run toc`: Generates a Table of Contents in `README.md` using `doctoc`.

### Code Quality & Formatting

- `npm run check`: A convenience script that runs the linter.
- `npm run fix`: A convenience script that formats code and then fixes lint issues.
- `npm run format`: Formats all JavaScript, Markdown, and JSON files with Prettier.
- `npm run lint`: Lints all JavaScript and Markdown files using ESLint.
- `npm run lint:fix`: Automatically fixes linting issues in all JavaScript and Markdown files.

### Core Development

- `npm run start`: Runs the application using `node src/index.js`.
- `npm run test`: Runs all tests with Jest and generates a coverage report.
- `npm run test:watch`: Runs Jest in watch mode, re-running tests on file changes.

### The "One-Click" Pre-Commit Workflow

- `npm run ready`: A convenience script to run before committing: updates all documentation and then formats and fixes all files.

<!-- END AVAILABLE SCRIPTS -->

## A Focus on Quality and Productivity

This starter template is more than just a collection of files; it's a workflow designed to maximize developer productivity and enforce high-quality standards from day one. The core philosophy is to **automate the tedious and error-prone tasks** so you can focus on what matters: building great software.

### The Cost of Stale Documentation

In many projects, the `README.md` quickly becomes outdated. Manually updating the project structure or list of scripts is an easily forgotten chore.

`js-starter` solves this problem with its custom documentation scripts:

- `scripts/update-readme-structure.js`: Saves you from manually drawing out file trees. What might take 5-10 minutes of careful, manual work (and is often forgotten) is now an instant, accurate, and repeatable command.
- `scripts/update-readme-scripts.js`: Ensures that your project's capabilities are always documented. It reads directly from `package.json`, so the documentation can't lie. It even reminds you to describe your scripts, promoting good habits.

### The Power of Workflow Scripts

Chaining commands together is a simple but powerful concept. The `fix`, `docs:all`, and `ready` scripts are designed to create a seamless development experience.

- Instead of remembering to run `prettier` then `eslint --fix`, you just run `npm run fix`.
- Instead of running three separate documentation commands, you just run `npm run docs:all`.
- And most importantly, before you commit, you run `npm run ready`. This single command is your pre-flight check. It guarantees that every commit you push is not only functional but also perfectly formatted, linted, and documented. This discipline saves countless hours in code review and prevents messy commit histories.

By embracing this automation, `js-starter` helps you build better software, faster.

## 📦 Release & Versioning

This project uses [`release-please`](https://github.com/googleapis/release-please) to automate releases, versioning, and changelog generation. This ensures a consistent and hands-off release process, relying on the Conventional Commits specification.

### How it Works

1.  **Conventional Commits**: All changes merged into the `main` branch should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat: add new feature`, `fix: resolve bug`).
2.  **Release Pull Request**: `release-please` runs as a GitHub Action and monitors the `main` branch for new Conventional Commits. When it detects changes that warrant a new release (e.g., a `feat` commit for a minor version, a `fix` commit for a patch version), it automatically creates a "Release PR" with a title like `chore(release): 1.2.3`.
3.  **Review and Merge**: This Release PR contains:
    - An updated `CHANGELOG.md` with all changes since the last release.
    - A bumped version number in `package.json`.
    - Proposed release notes. Review this PR, and once satisfied, merge it into `main`.
4.  **Automated GitHub Release & Publish**: Merging the Release PR triggers two final, sequential actions:
    - The `release-please` action creates a formal GitHub Release and a corresponding Git tag (e.g., `v1.1.0`).
    - The creation of this release then triggers the `publish.yml` workflow, which automatically publishes the package to the npm registry.

### Creating a New Release

To create subsequent releases, simply merge changes into the `main` branch using Conventional Commits. `release-please` will handle the rest by creating a Release PR. Once that PR is merged, the new version will be released automatically.

#### Your First Release

To bootstrap the process and create your very first release:

1.  Ensure your `package.json` version is at a sensible starting point (e.g., `1.0.0`).
2.  Make at least one commit to the `main` branch that follows the Conventional Commits specification. A good first commit would be: `feat: Initial release`.
3.  Push your commit(s) to `main`. The `release-please` action will run and create your first Release PR.
4.  Review and merge this PR. This will trigger the creation of your `v1.0.0` GitHub Release and publish the package to npm.

For more details, refer to the [release-please documentation](https://github.com/googleapis/release-please#how-it-works).

## 📁 Project Structure

<!-- START PROJECT STRUCTURE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN `npm run docs:structure` TO UPDATE -->

```plaintext
.
├── .github/           # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml             # Continuous Integration (CI) workflow
│       ├── publish.yml
│       └── release-please.yml
├── src/               # Source code
│   └── index.js # Main application entry point
├── tests/
│   └── index.test.js
├── .eslintignore      # Files/folders for ESLint to ignore
├── .eslintrc.json     # ESLint configuration
├── .gitignore         # Files/folders for Git to ignore
├── .npmrc
├── .prettierignore    # Files/folders for Prettier to ignore
├── .prettierrc.json   # Prettier configuration
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md # Community standards
├── CONTRIBUTING.md    # Guidelines for contributors
├── jest.config.mjs
├── LICENSE            # Project license
├── package.json       # Project metadata and dependencies
└── README.md          # This file
```

<!-- END PROJECT STRUCTURE -->

## ✍️ Linting for Documentation

This project uses the [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc) package to enforce that all functions, classes, and methods are properly documented using JSDoc comments. This helps maintain a high level of code quality and makes the codebase easier for new and existing developers to understand.

### How to Check for Missing Documentation

You can check the entire project for missing or incomplete docblocks by running the standard linting command:

```bash
npm run lint
```

ESLint will scan your JavaScript files and report any undocumented code as a warning.

### Example

Consider the following function in your code without any documentation:

```javascript
function calculateArea(width, height) {
  return width * height;
}
```

When you run `npm run lint`, ESLint will produce a warning similar to this:

```plaintext
/path/to/your/project/src/your-file.js
  1:1  warning  Missing JSDoc for function 'calculateArea'  jsdoc/require-jsdoc
```

To fix this, you would add a JSDoc block that describes the function, its parameters, and what it returns. Most modern code editors (like VS Code) can help by generating a skeleton for you if you type `/**` and press Enter above the function.

**Corrected Code:**

```javascript
/**
 * Calculates the area of a rectangle.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 * @returns {number} The calculated area.
 */
function calculateArea(width, height) {
  return width * height;
}
```

After adding the docblock, running `npm run lint` again will no longer show the warning for this function.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## 🗺️ Roadmap

This project is actively maintained, and we have a clear vision for its future. Here are some of the features and improvements we are planning:

- **TypeScript Support**: Add a separate branch or configuration for a TypeScript version of this template.
- **Monorepo Example**: Provide guidance and an example setup for using this template within a monorepo structure.
- **Containerization**: Include a `Dockerfile` and `docker-compose.yml` for easy container-based development.
- **Additional CI/CD Examples**: Add examples for other CI/CD providers like CircleCI or GitLab CI.

If you have ideas for other features, please open an issue to discuss them!

## ⚖️ Code of Conduct

To ensure a welcoming and inclusive community, this project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards of behavior we expect from all participants.

## 🙏 Acknowledgements

This project was built upon the shoulders of giants. We'd like to thank the creators and maintainers of these amazing open-source tools and specifications that make this template possible:

- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Release Please](https://github.com/googleapis/release-please)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Doctoc](https://github.com/thlorenz/doctoc)
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/)
- [Contributor Covenant](https://www.contributor-covenant.org/)

## 👨‍💻 About the Author

This template was created and is maintained by **Ion Gireada**.

- **GitHub**: [@ioncakephper](https://github.com/ioncakephper)
- **Website**: Feel free to add your personal website or blog here.
- **LinkedIn**: Connect with me on [LinkedIn](https://www.linkedin.com/in/ion-gireada-223929/)!

## 📄 License

This project is licensed under the [MIT License](LICENSE).
