# Slot 5×3 — Pixi.js + TypeScript

Test task: implementation of a 5×3 slot machine prototype using Pixi.js and TypeScript with a clean architecture separating model logic, reactive state, UI, and rendering scene.

# Features

5×3 slot grid

Spin / Stop / Auto-spin

Bet selection

Balance & win display

Auto-spin series

FSM

Reactive ViewModel state

# Model

Pure slot business logic:

balance

bet

applying spin result

win calculation

No dependencies on UI, Pixi, timers, or async code.

# ViewModel

Single reactive state contract shared by UI and Scene:

current phase

balance / bet / win

auto-spin state

action availability

Both UI and Scene subscribe to ViewModel updates.

# Scene

Responsible for:

reel animation

spin timing

stopping logic

win presentation

Contains the slot FSM:

idle → spinning → stopping → showWin → idle

Scene observes ViewModel and reports results back.

# UI

HTML control panel:

Spin / Stop / Auto buttons

Bet selection

State display

UI modifies only the ViewModel.

# Install dependencies:
npm install

npm run dev
