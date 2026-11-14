<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sorteador de Bingo — MulheRio Maker</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Shrikhand&family=Rubik:wght@400;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <main class="caller">

    <header class="caller__header">
      <span class="spark spark--1">✦</span>
      <span class="spark spark--2">✦</span>
      <span class="spark spark--3">✦</span>
      <p class="caller__kicker">Clube</p>
      <h1 class="caller__title">MulheRio Maker</h1>
      <p class="caller__subtitle">Sorteador de Bingo</p>
    </header>

    <!-- Current draw: big letter + number -->
    <section class="current" aria-live="polite">
      <span class="current__letter" id="current-letter">–</span>
      <span class="current__number" id="current-number">–</span>
      <span class="current__hint">Pressione <kbd>Espaço</kbd> ou clique em Sortear</span>
    </section>

    <section class="controls">
      <button id="draw-btn" class="btn btn--primary">Sortear número</button>
      <button id="undo-btn" class="btn">Desfazer</button>
      <button id="reset-btn" class="btn btn--danger">Reiniciar</button>
    </section>

    <section class="options">
      <label class="toggle">
        <input type="checkbox" id="show-letters" checked>
        Mostrar letras (B&nbsp;I&nbsp;N&nbsp;G&nbsp;O)
      </label>
    </section>

    <!-- Last 5 draws -->
    <section class="recent">
      <h2>Últimos sorteios</h2>
      <ol id="recent-list" class="recent__list"></ol>
    </section>

    <!-- Full board: all 75 numbers, highlight drawn ones -->
    <section class="board">
      <h2>Painel <span id="board-count"></span></h2>
      <div id="board" class="board__grid"></div>
    </section>

  </main>

  <script src="app.js"></script>
</body>
</html>
