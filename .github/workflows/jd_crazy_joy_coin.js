# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: jd_crazy_joy_coin

on:
  workflow_dispatch:
  schedule:
    - cron: '* 4/* * * *'
  repository_dispatch:
    types: jd_crazy_joy_coin
jobs:
  build:

    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          repository: Tersd07/JDScripts
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Cache node_modules
        uses: actions/cache@v2 # 使用 GitHub 官方的缓存 Action。
        env:
          cache-name: cache-node-modules
        with:
          path: node_modules
          key: ${{ runner.os }}-${{ env.cache-name }}-${{ hashFiles('package-lock.json') }} # 使用 package-lock.json 的 Hash 作为缓存的 key。也可以使用 package.json 代替
      - name: npm install
        run: |
          npm install
      - name: 'jd_crazy_joy_coin'
        run: |
          node jd_crazy_joy_coin.js
        env:
          JD_COOKIE: ${{ secrets.JD_COOKIE }}
          JD_USER_AGENT: ${{ secrets.JD_USER_AGENT }}
          JD_DEBUG: ${{ secrets.JD_DEBUG }}
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          QQ_SKEY: ${{ secrets.QQ_SKEY }}
          QQ_MODE: ${{ secrets.QQ_MODE }}
          BARK_PUSH: ${{ secrets.BARK_PUSH }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
          BARK_SOUND: ${{ secrets.BARK_SOUND }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
          IGOT_PUSH_KEY: ${{ secrets.IGOT_PUSH_KEY }}
          DREAM_FACTORY_SHARE_CODES: ${{ secrets.DREAM_FACTORY_SHARE_CODES }}
        env:
          JD_COOKIE: ${{ secrets.JD_COOKIE }}
