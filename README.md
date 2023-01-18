# Vue-Sandbox-Helper

## Приложение на Mac
- [для Mac Intel](https://github.com/leosoft11/vue_sandbox_helper/releases/download/v0.1.10/sandboxhelper-0.1.11.dmg)
- [для Mac M1 (ARM)](https://github.com/leosoft11/vue_sandbox_helper/releases/download/v0.1.10/sandboxhelper-0.1.11-arm64.dmg)

## Установка зависимых окружений

1. Перейти в папку с проектом
2. Выполнить команду `npm i` (если на компьютере не установлена `node`, необходимо установить `brew install node`, либо скачать с оффициального сайта - https://nodejs.org/en/)

## Сборка приложения (Production Mode)

1. Используя терминал, в папке с проектом выполнить команду:

```
npm run electron:build
```

2. Открыть папку `dist_electron` (Тут будет готовое приложение)

## Запуск приложения в режиме разработки (Dev mode)

1. Используя терминал, в папке с проектом выполнить команду:

```
npm run electron:serve
```


## Фикс ошибки ENOENT

https://cloud.tencent.com/developer/article/2168586
