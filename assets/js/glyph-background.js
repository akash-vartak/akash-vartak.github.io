(function () {
  var CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var MAX_WAVES = 12;
  var TRAIL = 12;
  var TRAIL_LIFE = 700;
  var WAVE_LIFE = 4;
  var WAVE_GAP = 0.3;
  var WAVE_SPEED = 560;
  var WAVE_SLOWDOWN = 0.66;
  var WAVE_EDGE = 10;
  var WAVE_TAIL = 30;
  var DRIFT = [-30, 12];
  var ACTIVITY_DECAY = 900;

  var VERTEX = [
    "attribute vec2 position;",
    "void main() {",
    "  gl_Position = vec4(position, 0.0, 1.0);",
    "}",
  ].join("\n");

  var FRAGMENT = [
    "precision highp float;",
    "uniform sampler2D atlas;",
    "uniform vec2 size;",
    "uniform vec2 cell;",
    "uniform float dpr;",
    "uniform float count;",
    "uniform float time;",
    "uniform float rest;",
    "uniform float haze;",
    "uniform float hoverInk;",
    "uniform float activity;",
    "uniform vec2 drift;",
    "uniform vec3 color;",
    "uniform vec3 accent;",
    "uniform vec4 waves[" + MAX_WAVES * 2 + "];",
    "uniform vec4 trail[" + TRAIL + "];",
    "",
    "float hash(vec2 p) {",
    "  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);",
    "}",
    "",
    "float smoothNoise(vec2 p) {",
    "  vec2 i = floor(p);",
    "  vec2 f = fract(p);",
    "  vec2 u = f * f * (3.0 - 2.0 * f);",
    "  return mix(",
    "    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),",
    "    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),",
    "    u.y",
    "  );",
    "}",
    "",
    "float clouds(vec2 p) {",
    "  float v = 0.0;",
    "  float a = 0.55;",
    "  for (int i = 0; i < 4; i++) {",
    "    v += a * smoothNoise(p);",
    "    p = p * 2.02 + vec2(17.1, 9.4);",
    "    a *= 0.5;",
    "  }",
    "  return v;",
    "}",
    "",
    "float outline(float kind, float angle, float phase) {",
    "  if (kind < 0.5) return 1.0;",
    "  if (kind < 1.5) {",
    "    float s = sin(angle);",
    "    float c = cos(angle);",
    "    return (2.0 - 2.0 * s + s * sqrt(abs(c)) / (s + 1.4)) * 0.42;",
    "  }",
    "  return 1.0 + 0.14 * sin(3.0 * angle + phase) + 0.08 * sin(5.0 * angle - phase * 1.3);",
    "}",
    "",
    "void main() {",
    "  vec2 pixel = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y);",
    "  vec2 index = floor(pixel / cell);",
    "  vec2 point = (index + 0.5) * cell / dpr;",
    "",
    "  float ring = 0.0;",
    "  for (int i = 0; i < " + MAX_WAVES + "; i++) {",
    "    vec4 a = waves[i * 2];",
    "    vec4 b = waves[i * 2 + 1];",
    "    if (a.w <= 0.0) continue;",
    "    vec2 v = point - a.xy;",
    "    float angle = atan(-v.y, v.x);",
    "    float shape = mix(1.0, outline(b.x, angle, b.z), b.y);",
    "    shape *= 1.0 + 0.07 * sin(3.0 * angle + b.z + b.w) + 0.05 * sin(5.0 * angle - b.z * 1.7 - b.w * 1.3) + 0.03 * sin(9.0 * angle + b.w * 2.1);",
    "    float d = length(v) - a.z * shape;",
    "    float k = d > 0.0 ? d / " + WAVE_EDGE.toFixed(1) + " : d / " + WAVE_TAIL.toFixed(1) + ";",
    "    ring = max(ring, exp(-k * k) * a.w);",
    "  }",
    "",
    "  float hover = 0.0;",
    "  for (int i = 0; i < " + TRAIL + "; i++) {",
    "    vec4 t = trail[i];",
    "    if (t.w <= 0.0) continue;",
    "    vec2 v = point - t.xy;",
    "    hover += t.w * exp(-dot(v, v) / (2.0 * t.z * t.z));",
    "  }",
    "  hover = min(hover, 1.0);",
    "",
    "  mat2 turn = mat2(0.82, 0.57, -0.57, 0.82);",
    "  vec2 q = turn * (point - drift);",
    "  float blob = smoothNoise(vec2(q.x / 140.0, q.y / 80.0) + vec2(time * 0.04, 0.0)) * 0.62",
    "    + smoothNoise(vec2(q.x / 62.0, q.y / 36.0) + vec2(3.7, time * 0.06)) * 0.38;",
    "  float grain = smoothNoise(vec2(q.x / 30.0, q.y / 14.0) + vec2(time * 0.2, 7.3));",
    "  float cloud = blob * (0.82 + 0.24 * grain);",
    "  float mask = pow(smoothstep(0.47 - 0.2 * activity, 0.84, cloud), 2.6);",
    "",
    "  float seed = hash(index);",
    "  float epoch = floor(time * 0.08 * (0.4 + seed) + seed * 97.0);",
    "  float character = floor(hash(index + epoch * 0.137) * count);",
    "  vec2 local = fract(pixel / cell);",
    "  float ink = pow(texture2D(atlas, vec2((character + local.x) / count, local.y)).a, 1.7);",
    "",
    "  float grey = ink * clamp(rest + haze * mask * (1.0 + 0.3 * activity) + hoverInk * hover * (0.6 + 0.4 * mask), 0.0, 1.0);",
    "  float blue = ink * ring * 0.72;",
    "  float alpha = grey + blue - grey * blue;",
    "  vec3 tint = color * grey * (1.0 - blue) + accent * blue;",
    "  gl_FragColor = vec4(tint, alpha);",
    "}",
  ].join("\n");

  function compile(gl, type, source) {
    var shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  }

  function toRgb(color) {
    var probe = document.createElement("canvas").getContext("2d");
    if (!probe) return [0.9, 0.9, 0.9];
    probe.fillStyle = color;
    probe.fillRect(0, 0, 1, 1);
    var data = probe.getImageData(0, 0, 1, 1).data;
    return [data[0] / 255, data[1] / 255, data[2] / 255];
  }

  function drawAtlas(cellWidth, cellHeight, font) {
    var atlas = document.createElement("canvas");
    atlas.width = Math.ceil(cellWidth * CHARACTERS.length);
    atlas.height = Math.ceil(cellHeight);
    var context = atlas.getContext("2d");
    context.font = font;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#fff";
    for (var i = 0; i < CHARACTERS.length; i++) {
      context.fillText(CHARACTERS[i], (i + 0.5) * cellWidth, cellHeight / 2);
    }
    return atlas;
  }

  function createRenderer(gl) {
    var vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    var fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    var program = gl.createProgram();
    if (!vertex || !fragment || !program) return null;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
    gl.useProgram(program);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    function at(name) {
      return gl.getUniformLocation(program, name);
    }
    var uniforms = {
      atlas: at("atlas"),
      size: at("size"),
      cell: at("cell"),
      dpr: at("dpr"),
      count: at("count"),
      time: at("time"),
      rest: at("rest"),
      haze: at("haze"),
      hoverInk: at("hoverInk"),
      activity: at("activity"),
      drift: at("drift"),
      color: at("color"),
      accent: at("accent"),
      waves: at("waves"),
      trail: at("trail"),
    };
    gl.uniform1i(uniforms.atlas, 0);
    gl.uniform1f(uniforms.count, CHARACTERS.length);
    gl.uniform1f(uniforms.rest, 0);
    gl.uniform1f(uniforms.haze, 0.1);
    gl.uniform1f(uniforms.hoverInk, 0.3);

    return {
      atlas: function (image) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      },
      draw: function (f) {
        gl.viewport(0, 0, f.width, f.height);
        gl.uniform2f(uniforms.size, f.width, f.height);
        gl.uniform2f(uniforms.cell, f.cell[0], f.cell[1]);
        gl.uniform1f(uniforms.dpr, f.dpr);
        gl.uniform1f(uniforms.time, f.time);
        gl.uniform1f(uniforms.activity, f.activity);
        gl.uniform2f(uniforms.drift, f.drift[0], f.drift[1]);
        gl.uniform3f(uniforms.color, f.color[0], f.color[1], f.color[2]);
        gl.uniform3f(uniforms.accent, f.accent[0], f.accent[1], f.accent[2]);
        gl.uniform4fv(uniforms.waves, f.waves);
        gl.uniform4fv(uniforms.trail, f.trail);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      },
    };
  }

  function initGlyphBackground() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var canvas = document.getElementById("glyph-background");
    if (!canvas) return;

    var gl;
    try {
      gl = canvas.getContext("webgl", { premultipliedAlpha: true, preserveDrawingBuffer: true, antialias: false });
    } catch (e) {
      gl = null;
    }
    var renderer = gl ? createRenderer(gl) : null;
    if (!renderer) return;

    var fontSize = 10;
    var interactive = true;

    var width = 0;
    var height = 0;
    var dpr = 1;
    var cell = [7, 13];
    var frames = 0;
    var colorKey = "";
    var color = [0.55, 0.55, 0.55];
    var accent = [0.55, 0.55, 0.55];
    var waves = new Float32Array(MAX_WAVES * 8);
    var trail = new Float32Array(TRAIL * 4);

    var liveWaves = [];
    var liveTrail = [];
    var timeMs = 0;
    var activity = { value: 0, at: 0 };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      var font = fontSize * dpr + "px Menlo, ui-monospace, SFMono-Regular, Consolas, monospace";
      var measure = document.createElement("canvas").getContext("2d");
      measure.font = font;
      cell = [Math.round(measure.measureText("0").width), Math.round(fontSize * 1.25 * dpr)];
      renderer.atlas(drawAtlas(cell[0], cell[1], font));
    }

    function draw(time, looping) {
      if (width === 0 || height === 0) return;
      if (!looping || frames++ % 30 === 0) {
        var style = getComputedStyle(document.documentElement);
        var glow = style.getPropertyValue("--global-text-color-light").trim() || "#828282";
        var shape = style.getPropertyValue("--global-theme-color").trim() || "#038208";
        var key = glow + "|" + shape;
        if (key !== colorKey) {
          colorKey = key;
          color = toRgb(glow);
          accent = toRgb(shape);
        }
      }

      waves.fill(0);
      for (var w = liveWaves.length - 1; w >= 0; w--) {
        var wave = liveWaves[w];
        var age = (timeMs - wave.startTime) / 1000 - wave.delay;
        if (age >= WAVE_LIFE) {
          liveWaves.splice(w, 1);
          continue;
        }
      }
      liveWaves.forEach(function (wave, i) {
        var age = (timeMs - wave.startTime) / 1000 - wave.delay;
        if (age <= 0) return;
        var radius = (WAVE_SPEED * age) / (1 + WAVE_SLOWDOWN * age);
        var fade = Math.min(1, age / 0.05) * Math.exp(-Math.max(0, age - 0.4) / 1.3) * Math.min(1, (WAVE_LIFE - age) / 0.5);
        waves[i * 8] = wave.x;
        waves[i * 8 + 1] = wave.y;
        waves[i * 8 + 2] = radius;
        waves[i * 8 + 3] = fade * wave.strength;
        waves[i * 8 + 4] = wave.kind;
        waves[i * 8 + 5] = 0.12 + 0.5 * Math.min(1, age / 2.2);
        waves[i * 8 + 6] = wave.phase;
        waves[i * 8 + 7] = age * 3;
      });

      trail.fill(0);
      liveTrail.forEach(function (point, i) {
        var tAge = (time - point.t) / TRAIL_LIFE;
        if (tAge < 0 || tAge >= 1) return;
        trail[i * 4] = point.x;
        trail[i * 4 + 1] = point.y;
        trail[i * 4 + 2] = 40 + 25 * tAge;
        trail[i * 4 + 3] = 0.3 * (1 - tAge) * (1 - tAge);
      });

      var seconds = time / 1000;
      var decayedActivity = activity.value * Math.exp(-Math.max(0, time - activity.at) / ACTIVITY_DECAY);

      renderer.draw({
        activity: decayedActivity,
        width: canvas.width,
        height: canvas.height,
        dpr: dpr,
        cell: cell,
        time: seconds,
        drift: [DRIFT[0] * seconds, DRIFT[1] * seconds],
        color: color,
        accent: accent,
        waves: waves,
        trail: trail,
      });
    }

    function spawn(x, y) {
      var kind = 1 + Math.floor(Math.random() * 2);
      var phase = Math.random() * Math.PI * 2;
      [
        [0, 1],
        [WAVE_GAP, 0.55],
      ].forEach(function (pair) {
        liveWaves = liveWaves.slice(1 - MAX_WAVES);
        liveWaves.push({
          x: x,
          y: y,
          kind: kind,
          phase: phase,
          strength: pair[1],
          delay: pair[0],
          startTime: timeMs,
        });
      });
    }

    resize();
    draw(timeMs);

    var resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(function () {
      resize();
      draw(timeMs);
    }) : null;
    if (resizeObserver) resizeObserver.observe(document.documentElement);
    else window.addEventListener("resize", function () {
      resize();
      draw(timeMs);
    });

    var lastFrameTime = null;
    var rafId = null;
    function loop(now) {
      if (document.visibilityState === "hidden") {
        lastFrameTime = null;
        rafId = requestAnimationFrame(loop);
        return;
      }
      if (lastFrameTime == null) lastFrameTime = now;
      var delta = Math.min(now - lastFrameTime, 64);
      lastFrameTime = now;
      timeMs += delta;
      draw(timeMs, true);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    if (interactive) {
      window.addEventListener(
        "pointermove",
        function (event) {
          var x = event.clientX;
          var y = event.clientY;
          var now = timeMs;
          var last = liveTrail[liveTrail.length - 1];
          var current = activity.value * Math.exp(-Math.max(0, now - activity.at) / ACTIVITY_DECAY);
          activity = {
            value: Math.min(1, current + (last ? Math.hypot(x - last.x, y - last.y) : 0) / 600),
            at: now,
          };
          if (last && Math.hypot(x - last.x, y - last.y) < 18) return;
          liveTrail = liveTrail.filter(function (p) {
            return now - p.t < TRAIL_LIFE;
          });
          liveTrail = liveTrail.slice(1 - TRAIL);
          liveTrail.push({ x: x, y: y, t: now });
        },
        { passive: true }
      );
      window.addEventListener(
        "pointerdown",
        function (event) {
          spawn(event.clientX, event.clientY);
        },
        { passive: true }
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlyphBackground);
  } else {
    initGlyphBackground();
  }
})();
