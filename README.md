# Мои задачи — MVP

Небольшое веб-приложение для управления личными задачами. Проект сделан на чистом HTML, CSS и JavaScript без сборщиков и сторонних библиотек.

## Возможности

- добавление новой задачи;
- отметка задачи как выполненной;
- удаление отдельной задачи;
- удаление всех выполненных задач;
- счётчики общего количества и выполненных задач;
- автоматическое сохранение списка в `localStorage`;
- адаптивный интерфейс для телефона и компьютера.

## Запуск

1. Откройте папку проекта в Cursor.
2. Откройте файл `src/index.html` в браузере.

Сервер и установка зависимостей не требуются.

## Структура проекта

```text
cursor-github-mvp/
├── src/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## Git и GitHub

Первый коммит:

```bash
git init
git add .
git commit -m "init project"
git branch -M main
```

После создания пустого репозитория на GitHub подключите его (подставьте свой URL):

```bash
git remote add origin https://github.com/ВАШ-ЛОГИН/cursor-github-mvp.git
git push -u origin main
```

Создание ветки для улучшения:

```bash
git switch -c feature/filters
```

В качестве улучшения для учебного Pull Request можно добавить фильтры «Все / Активные / Выполненные» в список задач, затем:

```bash
git add .
git commit -m "add task filters"
git push -u origin feature/filters
```

Создайте Pull Request на GitHub из `feature/filters` в `main` и выполните Merge.
