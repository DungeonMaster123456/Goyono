import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// HTML & CSS — 16 lessons
// ---------------------------------------------------------------------------
const htmlLessons = [
  {
    slug: "what-is-html",
    title: "What is HTML?",
    language: "html",
    starterCode: `<h1>hello, world</h1>\n<p>this is a paragraph.</p>\n`,
    content:
      "# What is HTML?\n\nHTML (HyperText Markup Language) describes the structure of a page — headings, paragraphs, links, images. It isn't a programming language; it's markup: you wrap content in tags that say what that content *is*.\n\nRun the starter code and you'll see it rendered live, not printed as text.",
  },
  {
    slug: "tags-and-elements",
    title: "Tags, elements, and nesting",
    language: "html",
    starterCode: `<div>\n  <h2>My favorite things</h2>\n  <p>Coffee, code, and <strong>cold</strong> mornings.</p>\n</div>\n`,
    content:
      "# Tags and elements\n\nMost tags come in pairs: an opening tag `<p>` and a closing tag `</p>`, with content between them — that whole thing is an element. Elements can nest inside other elements, forming a tree.",
  },
  {
    slug: "headings-paragraphs-text",
    title: "Headings, paragraphs, and text",
    language: "html",
    starterCode: `<h1>Main title</h1>\n<h2>Section title</h2>\n<p>Body text goes in a paragraph tag. <em>Emphasis</em> and <strong>strong importance</strong> change meaning, not just looks.</p>\n`,
    content:
      "# Headings and text\n\n`<h1>` through `<h6>` are headings in decreasing importance. `<p>` is a paragraph. `<em>` and `<strong>` carry semantic meaning — screen readers announce them differently, not just render them in italics/bold.",
  },
  {
    slug: "links-and-images",
    title: "Links and images",
    language: "html",
    starterCode: `<a href="https://example.com">Visit example.com</a>\n<br>\n<img src="https://placekitten.com/200/150" alt="a kitten">\n`,
    content:
      '# Links and images\n\n`<a href="...">` creates a clickable link. `<img src="..." alt="...">` embeds an image — `alt` describes it for accessibility and shows if the image fails to load. Always write a real `alt`.',
  },
  {
    slug: "lists",
    title: "Lists",
    language: "html",
    starterCode: `<ul>\n  <li>Unordered item one</li>\n  <li>Unordered item two</li>\n</ul>\n<ol>\n  <li>Ordered step one</li>\n  <li>Ordered step two</li>\n</ol>\n`,
    content:
      "# Lists\n\n`<ul>` is an unordered (bulleted) list, `<ol>` is ordered (numbered). Each item goes in an `<li>` (list item), nested inside.",
  },
  {
    slug: "divs-and-semantic-tags",
    title: "Divs and semantic layout tags",
    language: "html",
    starterCode: `<header>\n  <h1>Site name</h1>\n</header>\n<main>\n  <p>Main content here.</p>\n</main>\n<footer>\n  <p>&copy; 2026</p>\n</footer>\n`,
    content:
      "# Semantic layout\n\n`<div>` is a generic container with no meaning of its own. Modern HTML prefers semantic tags — `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>` — which describe the *role* of a region, helping both readability and accessibility.",
  },
  {
    slug: "forms-basics",
    title: "Forms",
    language: "html",
    starterCode: `<form>\n  <label for="name">Name</label>\n  <input id="name" type="text" placeholder="Your name">\n  <button type="submit">Send</button>\n</form>\n`,
    content:
      "# Forms\n\n`<form>` wraps inputs that collect data. `<input>` has many `type`s (text, email, password, number...). Always pair an `<input>` with a `<label>` — it's how people using screen readers, and anyone clicking the label text, can reach the field.",
  },
  {
    slug: "tables",
    title: "Tables",
    language: "html",
    starterCode: `<table>\n  <tr>\n    <th>Language</th>\n    <th>Year</th>\n  </tr>\n  <tr>\n    <td>Python</td>\n    <td>1991</td>\n  </tr>\n</table>\n`,
    content:
      "# Tables\n\n`<table>` holds rows (`<tr>`), which hold cells — `<th>` for headers, `<td>` for data. Tables are for tabular data, not page layout (that's what CSS is for).",
  },
  {
    slug: "what-is-css",
    title: "What is CSS?",
    language: "html",
    starterCode: `<style>\n  h1 { color: #e9b84c; font-family: sans-serif; }\n  p { color: #555; }\n</style>\n<h1>Styled heading</h1>\n<p>Styled paragraph.</p>\n`,
    content:
      "# What is CSS?\n\nCSS (Cascading Style Sheets) controls how HTML looks — color, spacing, layout, fonts. A CSS rule is a selector (what to style) plus declarations (how) in curly braces.",
  },
  {
    slug: "selectors",
    title: "Selectors: element, class, id",
    language: "html",
    starterCode: `<style>\n  p { color: gray; }\n  .highlight { color: orange; font-weight: bold; }\n  #intro { font-size: 20px; }\n</style>\n<p id="intro">Intro paragraph.</p>\n<p class="highlight">This one is highlighted.</p>\n<p>A normal paragraph.</p>\n`,
    content:
      "# Selectors\n\nElement selectors (`p`) target every element of that type. Class selectors (`.highlight`) target any element with that class — reusable across many elements. ID selectors (`#intro`) target exactly one element, since IDs must be unique on a page.",
  },
  {
    slug: "box-model",
    title: "The box model",
    language: "html",
    starterCode: `<style>\n  .box {\n    width: 200px;\n    padding: 16px;\n    border: 2px solid #e9b84c;\n    margin: 20px;\n  }\n</style>\n<div class="box">Content sits inside padding, inside border, with margin outside.</div>\n`,
    content:
      "# The box model\n\nEvery element is a box: content, then padding (space inside the border), then border, then margin (space outside the border, pushing other elements away).",
  },
  {
    slug: "flexbox",
    title: "Flexbox layout",
    language: "html",
    starterCode: `<style>\n  .row { display: flex; gap: 12px; }\n  .item { background: #222; color: white; padding: 12px; flex: 1; }\n</style>\n<div class="row">\n  <div class="item">One</div>\n  <div class="item">Two</div>\n  <div class="item">Three</div>\n</div>\n`,
    content:
      "# Flexbox\n\n`display: flex` turns a container into a flex row (by default). Its children line up along that row, and `gap` spaces them evenly. `flex: 1` on a child lets it grow to fill available space — this is how most modern layouts are built.",
  },
  {
    slug: "colors-and-units",
    title: "Colors and units",
    language: "html",
    starterCode: `<style>\n  .a { background: #1b1f27; color: white; padding: 1rem; }\n  .b { background: rgb(233, 184, 76); padding: 16px; }\n</style>\n<div class="a">hex color, rem spacing</div>\n<div class="b">rgb color, px spacing</div>\n`,
    content:
      "# Colors and units\n\nColors: hex (`#e9b84c`), `rgb()`, `hsl()`, or named colors. Sizes: `px` is a fixed pixel, `rem` scales with the root font size (better for accessibility since it respects zoom/user font settings), `%` is relative to the parent.",
  },
  {
    slug: "responsive-basics",
    title: "Responsive design basics",
    language: "html",
    starterCode: `<style>\n  .card { background: #1b1f27; color: white; padding: 16px; }\n  @media (max-width: 500px) {\n    .card { background: #7a6531; }\n  }\n</style>\n<div class="card">Resize the preview to see this change color.</div>\n`,
    content:
      "# Responsive basics\n\n`@media` queries apply CSS conditionally based on things like screen width. This is how one page adapts from a phone to a desktop.",
  },
  {
    slug: "css-transitions",
    title: "Transitions and simple animation",
    language: "html",
    starterCode: `<style>\n  .btn {\n    background: #e9b84c;\n    padding: 10px 18px;\n    border-radius: 8px;\n    display: inline-block;\n    transition: transform 0.2s ease;\n  }\n  .btn:hover { transform: scale(1.08); }\n</style>\n<div class="btn">Hover me</div>\n`,
    content:
      "# Transitions\n\n`transition` smoothly animates a property change (like on `:hover`) instead of it snapping instantly. This is the foundation of what makes an interface feel 'smooth' rather than static.",
  },
  {
    slug: "building-a-page",
    title: "Project: build a small page",
    language: "html",
    starterCode: `<style>\n  body { font-family: sans-serif; background: #0d0f13; color: #eee; }\n  .card { max-width: 400px; margin: 40px auto; padding: 20px; background: #1b1f27; border-radius: 10px; }\n  h1 { color: #e9b84c; }\n</style>\n<div class="card">\n  <h1>My page</h1>\n  <p>Combine everything you've learned: structure, semantic tags, classes, flexbox, and a hover transition.</p>\n</div>\n`,
    content:
      "# Project: build a small page\n\nPut it all together — structure with semantic tags, style with classes and the box model, lay things out with flexbox, and add one small transition. There's no single right answer; this is your first real page.",
  },
];

// ---------------------------------------------------------------------------
// Python Foundations → intermediate — 18 lessons
// ---------------------------------------------------------------------------
const pythonLessons = [
  {
    slug: "hello-world",
    title: "Hello, world",
    language: "python",
    starterCode: 'print("hello, world")\n',
    content: "# Hello, world\n\n`print()` writes text to the terminal. Run it, then change the message.",
  },
  {
    slug: "variables",
    title: "Variables and types",
    language: "python",
    starterCode: 'name = "goyono"\nyear = 2026\nprint(name, year)\n',
    content: "# Variables and types\n\nPython infers types automatically: strings, integers, floats, booleans.",
  },
  {
    slug: "strings",
    title: "Working with strings",
    language: "python",
    starterCode: `name = "world"\nprint(f"hello, {name}")\nprint("HELLO".lower())\nprint("  trim me  ".strip())\n`,
    content:
      '# Strings\n\nf-strings (`f"...{expr}..."`) embed values directly. Strings have built-in methods like `.lower()`, `.upper()`, `.strip()`, `.split()`.',
  },
  {
    slug: "numbers-and-math",
    title: "Numbers and math",
    language: "python",
    starterCode: `a = 7\nb = 2\nprint(a + b, a - b, a * b, a / b, a // b, a % b, a ** b)\n`,
    content:
      "# Numbers\n\n`/` is true division (always returns a float). `//` is floor division. `%` is remainder (modulo). `**` is exponent.",
  },
  {
    slug: "control-flow",
    title: "If, else, and comparisons",
    language: "python",
    starterCode: `age = 16\nif age >= 18:\n    print("adult")\nelif age >= 13:\n    print("teen")\nelse:\n    print("kid")\n`,
    content: "# Control flow\n\n`if`/`elif`/`else` branches based on conditions using comparisons and booleans.",
  },
  {
    slug: "loops",
    title: "For and while loops",
    language: "python",
    starterCode: `for i in range(5):\n    print(i)\n\nn = 3\nwhile n > 0:\n    print("countdown", n)\n    n -= 1\n`,
    content:
      "# Loops\n\n`for ... in range(n)` repeats n times. `while` repeats as long as a condition holds — remember to change something inside the loop or it never ends.",
  },
  {
    slug: "lists",
    title: "Lists",
    language: "python",
    starterCode: `fruits = ["apple", "banana", "cherry"]\nfruits.append("date")\nprint(fruits[0], fruits[-1])\nprint(len(fruits))\nfor f in fruits:\n    print(f)\n`,
    content:
      "# Lists\n\nOrdered, mutable collections. Index from 0; negative indices count from the end. `.append()` adds an item, `len()` gets the count.",
  },
  {
    slug: "dictionaries",
    title: "Dictionaries",
    language: "python",
    starterCode: `person = {"name": "Ana", "age": 30}\nprint(person["name"])\nperson["city"] = "Lagos"\nfor key, value in person.items():\n    print(key, "->", value)\n`,
    content: "# Dictionaries\n\nKey-value pairs. Look up by key, not position. `.items()` gives you both at once.",
  },
  {
    slug: "functions",
    title: "Functions",
    language: "python",
    starterCode: `def greet(name, excited=False):\n    if excited:\n        return f"HEY {name.upper()}!"\n    return f"hey, {name}"\n\nprint(greet("world"))\nprint(greet("world", excited=True))\n`,
    content:
      "# Functions\n\n`def` defines a function, `return` sends back a value. Parameters can have default values, making them optional at the call site.",
  },
  {
    slug: "scope",
    title: "Scope: local vs global",
    language: "python",
    starterCode: `x = 10\n\ndef show():\n    y = 5  # local to this function\n    print(x, y)\n\nshow()\nprint(x)\n`,
    content:
      "# Scope\n\nVariables created inside a function only exist inside it (local scope). Variables outside are global and readable, but not writable, from inside functions unless you say `global`.",
  },
  {
    slug: "list-comprehensions",
    title: "List comprehensions",
    language: "python",
    starterCode: `nums = [1, 2, 3, 4, 5]\nsquares = [n * n for n in nums]\nevens = [n for n in nums if n % 2 == 0]\nprint(squares)\nprint(evens)\n`,
    content:
      "# List comprehensions\n\nA compact way to build a list from a loop, optionally with a filter. `[expr for item in iterable if condition]`.",
  },
  {
    slug: "tuples-and-sets",
    title: "Tuples and sets",
    language: "python",
    starterCode: `point = (3, 4)\nprint(point[0], point[1])\n\nunique = {1, 2, 2, 3, 3, 3}\nprint(unique)\n`,
    content:
      "# Tuples and sets\n\nTuples are like lists but immutable — you can't change them after creation. Sets store unique values only, with no order.",
  },
  {
    slug: "exceptions",
    title: "Try, except, and errors",
    language: "python",
    starterCode: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "can't divide by zero"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))\n`,
    content:
      "# Exceptions\n\n`try`/`except` catches errors instead of crashing the program. Catch specific exception types when you can — it's more precise than catching everything.",
  },
  {
    slug: "classes",
    title: "Classes and objects",
    language: "python",
    starterCode: `class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f"{self.name} says woof"\n\nd = Dog("Rex")\nprint(d.bark())\n`,
    content:
      '# Classes\n\nA class is a blueprint for objects. `__init__` runs when you create one (`Dog("Rex")`). `self` refers to the specific instance.',
  },
  {
    slug: "inheritance",
    title: "Inheritance",
    language: "python",
    starterCode: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return f"{self.name} makes a sound"\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} says meow"\n\nprint(Animal("Thing").speak())\nprint(Cat("Whiskers").speak())\n`,
    content:
      "# Inheritance\n\nA subclass (`Cat`) inherits from a parent (`Animal`) and can override methods to specialize behavior.",
  },
  {
    slug: "modules",
    title: "Modules and the standard library",
    language: "python",
    starterCode: `import math\nimport random\n\nprint(math.sqrt(16))\nprint(random.randint(1, 6))\n`,
    content:
      "# Modules\n\n`import` brings in code from Python's standard library (or your own files). `math`, `random`, `datetime`, and `json` are commonly used ones.",
  },
  {
    slug: "structured-data",
    title: "Working with structured data",
    language: "python",
    starterCode: `import json\n\ndata = {"name": "goyono", "lessons": 18}\nas_text = json.dumps(data)\nprint(as_text)\nback = json.loads(as_text)\nprint(back["lessons"])\n`,
    content:
      "# Structured data\n\n`json.dumps` turns a Python object into a JSON string; `json.loads` parses it back. This is how most APIs exchange data.",
  },
  {
    slug: "project-word-counter",
    title: "Project: word frequency counter",
    language: "python",
    starterCode: `text = "the quick brown fox jumps over the lazy dog the fox runs"\nwords = text.split()\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\n\nfor word, count in sorted(counts.items(), key=lambda x: -x[1]):\n    print(word, count)\n`,
    content:
      "# Project: word frequency counter\n\nCombines strings, dictionaries, loops, and sorting with a custom key — a small but real program.",
  },
];

// ---------------------------------------------------------------------------
// AI Foundations — 16 lessons
// ---------------------------------------------------------------------------
const aiLessons = [
  {
    slug: "what-is-a-model",
    title: "What is a model?",
    language: "python",
    starterCode: `model = {"hi": "hello!", "bye": "see you!"}\nprint(model.get("hi"))\n`,
    content:
      "# What is a model?\n\nAt the smallest scale, a model is a function mapping inputs to outputs. Real models learn that mapping from data instead of it being hardcoded.",
  },
  {
    slug: "tokens",
    title: "Tokens and tokenization",
    language: "python",
    starterCode: `text = "goyono teaches code"\ntokens = text.split()\nprint(tokens)\nprint(len(tokens))\n`,
    content:
      "# Tokens\n\nModels don't read raw text — they read tokens, chunks of text mapped to numbers. Real tokenizers split on subwords, not just spaces, so 'unbelievable' might become 'un', 'believ', 'able'.",
  },
  {
    slug: "vectors-and-embeddings",
    title: "Vectors and embeddings",
    language: "python",
    starterCode: `# a toy embedding: words as points in 2D space\nembeddings = {\n    "cat": (0.9, 0.1),\n    "dog": (0.8, 0.2),\n    "car": (0.1, 0.9),\n}\n\ndef distance(a, b):\n    return ((a[0]-b[0])**2 + (a[1]-b[1])**2) ** 0.5\n\nprint("cat-dog:", distance(embeddings["cat"], embeddings["dog"]))\nprint("cat-car:", distance(embeddings["cat"], embeddings["car"]))\n`,
    content:
      "# Vectors and embeddings\n\nAn embedding turns a word (or image, or anything) into a list of numbers — a point in space. Similar meanings end up close together. This toy example shows 'cat' and 'dog' closer than 'cat' and 'car'.",
  },
  {
    slug: "what-is-training",
    title: "What is training?",
    language: "python",
    starterCode: `# guess-and-adjust: the core idea behind training, massively simplified\ntarget = 10\nguess = 0\n\nfor step in range(10):\n    error = target - guess\n    guess += error * 0.5  # nudge toward the target\n    print(f"step {step}: guess={guess}")\n`,
    content:
      "# What is training?\n\nTraining repeatedly adjusts a model's internal numbers to reduce error between its output and the correct answer. This toy loop shows the shape of that idea: guess, measure error, nudge, repeat.",
  },
  {
    slug: "neural-network-shape",
    title: "The shape of a neural network",
    language: "python",
    starterCode: `# a tiny "neuron": weighted sum + activation\ndef neuron(inputs, weights, bias):\n    total = sum(i * w for i, w in zip(inputs, weights)) + bias\n    return max(0, total)  # ReLU activation\n\ninputs = [1.0, 0.5]\nweights = [0.8, -0.2]\nprint(neuron(inputs, weights, bias=0.1))\n`,
    content:
      "# Neural networks\n\nA neuron multiplies inputs by weights, sums them, adds a bias, then applies an activation function (here, ReLU: negative becomes 0). Stack many neurons in layers, and you have a neural network.",
  },
  {
    slug: "overfitting",
    title: "Overfitting and generalization",
    language: "python",
    starterCode: `# memorizing training data vs learning the pattern\ntraining_data = {2: 4, 3: 9, 4: 16}  # looks like x^2\n\ndef memorized(x):\n    return training_data.get(x, "unknown")  # only works on seen data\n\ndef generalized(x):\n    return x ** 2  # learned the actual rule\n\nprint(memorized(5), generalized(5))\n`,
    content:
      "# Overfitting\n\nA model that memorizes training examples fails on new ones. A model that learns the underlying pattern generalizes. Real training balances fitting the data against overfitting to it.",
  },
  {
    slug: "supervised-vs-unsupervised",
    title: "Supervised vs. unsupervised learning",
    language: "python",
    starterCode: `# supervised: labeled examples\nsupervised_data = [("sunny", "go outside"), ("rainy", "stay in")]\n\n# unsupervised: no labels, just find structure\nunsupervised_data = [1, 1, 2, 8, 9, 8, 1, 2]\nprint(supervised_data)\nprint(sorted(unsupervised_data))\n`,
    content:
      "# Supervised vs. unsupervised\n\nSupervised learning trains on labeled examples (input + correct answer). Unsupervised learning finds structure in unlabeled data, like grouping similar items.",
  },
  {
    slug: "language-models-predict",
    title: "Language models predict the next token",
    language: "python",
    starterCode: `# a toy bigram model: given a word, what usually comes next?\nbigrams = {\n    "the": ["cat", "dog", "sky"],\n    "cat": ["sat", "ran"],\n}\n\nimport random\nword = "the"\nsentence = [word]\nfor _ in range(3):\n    word = random.choice(bigrams.get(word, ["."]))\n    sentence.append(word)\nprint(" ".join(sentence))\n`,
    content:
      "# Language models predict\n\nAt their core, language models repeatedly predict 'what token comes next' given everything so far. This toy bigram model does the same thing at a tiny scale, using only the previous word.",
  },
  {
    slug: "prompting-basics",
    title: "Prompting: giving models clear instructions",
    language: "python",
    starterCode: `vague = "write something about dogs"\nspecific = "write a 2-sentence, upbeat description of a golden retriever puppy, for a pet adoption website"\n\nprint("vague prompt:", vague)\nprint("specific prompt:", specific)\n`,
    content:
      "# Prompting basics\n\nClear prompts specify: what to produce, its format, its length, and its tone/audience. Vague prompts get vague, inconsistent output — this applies whether you're asking a person or a model.",
  },
  {
    slug: "context-windows",
    title: "Context windows",
    language: "python",
    starterCode: `context_limit = 20  # toy token limit\nconversation = "hello there how are you doing today friend"\ntokens = conversation.split()\n\nif len(tokens) > context_limit:\n    tokens = tokens[-context_limit:]  # keep only the most recent\nprint(" ".join(tokens))\n`,
    content:
      "# Context windows\n\nA model can only 'see' a limited amount of text at once — its context window. Once a conversation exceeds it, the oldest parts get dropped or summarized.",
  },
  {
    slug: "hallucination",
    title: "Why models make things up",
    language: "python",
    starterCode: `facts = {"capital of France": "Paris"}\n\ndef answer(question):\n    if question in facts:\n        return facts[question]\n    return "a plausible-sounding but unverified guess"\n\nprint(answer("capital of France"))\nprint(answer("capital of Wakanda"))\n`,
    content:
      "# Hallucination\n\nModels generate the statistically likely next tokens, not verified facts. When a model doesn't actually 'know' something, it can still produce fluent, confident-sounding text that's wrong — always verify important claims.",
  },
  {
    slug: "bias-in-data",
    title: "Bias in training data",
    language: "python",
    starterCode: `training_examples = ["doctor: he", "doctor: he", "doctor: he", "nurse: she"]\n\nfrom collections import Counter\nprint(Counter(training_examples))\n`,
    content:
      "# Bias in data\n\nModels learn patterns from their training data — including its imbalances and stereotypes. This isn't a bug in the math; it's a direct consequence of what the model was shown.",
  },
  {
    slug: "evaluating-models",
    title: "Evaluating model outputs",
    language: "python",
    starterCode: `predictions = ["cat", "dog", "cat", "bird"]\nactual =      ["cat", "dog", "dog", "bird"]\n\ncorrect = sum(1 for p, a in zip(predictions, actual) if p == a)\naccuracy = correct / len(actual)\nprint(f"accuracy: {accuracy:.0%}")\n`,
    content:
      "# Evaluating models\n\nAccuracy is the simplest metric: fraction of correct predictions. Real evaluation is more nuanced (precision, recall, human review) but starts from this same idea — compare output to ground truth.",
  },
  {
    slug: "fine-tuning-vs-prompting",
    title: "Fine-tuning vs. prompting",
    language: "python",
    starterCode: `prompt_approach = "Always answer in French. " + "What is 2+2?"\nfine_tune_examples = [("What is 2+2?", "Quatre")] * 1000\n\nprint(prompt_approach)\nprint(len(fine_tune_examples), "training examples would reshape the model itself")\n`,
    content:
      "# Fine-tuning vs. prompting\n\nPrompting changes behavior at inference time with instructions — fast, reversible, no retraining. Fine-tuning actually updates the model's weights using new examples — slower, more permanent, often more consistent for a narrow task.",
  },
  {
    slug: "agents-and-tools",
    title: "Agents: models that use tools",
    language: "python",
    starterCode: `def calculator(expression):\n    return eval(expression)\n\ndef web_search(query):\n    return f"[search results for: {query}]"\n\ntask = "what is 47 * 12?"\nresult = calculator("47 * 12")\nprint(result)\n`,
    content:
      "# Agents and tools\n\nAn AI agent isn't just generating text — it decides when to call external tools (search, code execution, calculators, APIs) and uses their results to complete a task. goyono's terminal and tutor work similarly: the tutor is a model, the terminal is a tool you use together with it.",
  },
  {
    slug: "capstone-tiny-classifier",
    title: "Capstone: a tiny rule-based classifier",
    language: "python",
    starterCode: `def classify(text):\n    text = text.lower()\n    positive_words = ["good", "great", "love", "amazing"]\n    negative_words = ["bad", "terrible", "hate", "awful"]\n\n    score = 0\n    for word in text.split():\n        if word in positive_words:\n            score += 1\n        elif word in negative_words:\n            score -= 1\n\n    if score > 0:\n        return "positive"\n    elif score < 0:\n        return "negative"\n    return "neutral"\n\nprint(classify("this is a great and amazing day"))\nprint(classify("this was a terrible and awful mistake"))\nprint(classify("the sky is blue"))\n`,
    content:
      "# Capstone: a tiny classifier\n\nThis isn't machine learning — it's rule-based — but it's the same shape as sentiment analysis: turn text into a signal, then a decision. Real sentiment models learn these associations from data instead of a hardcoded word list, but the pipeline (text in, category out) is the same.",
  },
];

// ---------------------------------------------------------------------------
// Library — real, free, legally available books, easy → advanced
// ---------------------------------------------------------------------------
const books = [
  {
    slug: "automate-the-boring-stuff",
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    level: 1,
    subject: "python",
    description:
      "The most-recommended free starting point for programming with no prior experience. Practical, project-driven, and genuinely free — not a trial or excerpt.",
    url: "https://automatetheboringstuff.com/",
    license: "CC BY-NC-SA 3.0 — free to read online",
    order: 1,
  },
  {
    slug: "mdn-web-docs-learn",
    title: "HTML & CSS Beginner Tutorials",
    author: "MDN Web Docs (Mozilla)",
    level: 1,
    subject: "html-css",
    description:
      "Mozilla's official, free, and continuously updated introduction to HTML and CSS — the standard reference the entire web industry uses.",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    license: "CC BY-SA 2.5 — free, official documentation",
    order: 2,
  },
  {
    slug: "python-for-everybody",
    title: "Python for Everybody",
    author: "Dr. Charles Severance",
    level: 2,
    subject: "python",
    description:
      "A free full textbook (and companion course) built for people with zero programming background, moving from basics into working with data.",
    url: "https://www.py4e.com/book",
    license: "CC BY-NC-SA — free PDF and online reading",
    order: 3,
  },
  {
    slug: "eloquent-javascript",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    level: 3,
    subject: "html-css",
    description:
      "A deeper, project-based introduction to JavaScript and how it powers interactive web pages — a natural next step after static HTML/CSS.",
    url: "https://eloquentjavascript.net/",
    license: "CC BY-NC — free to read online, all editions",
    order: 4,
  },
  {
    slug: "think-python",
    title: "Think Python: How to Think Like a Computer Scientist",
    author: "Allen B. Downey",
    level: 4,
    subject: "python",
    description:
      "A more rigorous, computer-science-flavored Python book — good once basic syntax feels comfortable and you want to think about programs more precisely.",
    url: "https://greenteapress.com/wp/think-python-2e/",
    license: "CC BY-NC 3.0 — free PDF and HTML",
    order: 5,
  },
  {
    slug: "cs50-ai-notes",
    title: "CS50's Introduction to Artificial Intelligence with Python",
    author: "Harvard University (Brian Yu, David J. Malan)",
    level: 5,
    subject: "ai",
    description:
      "Harvard's free, publicly released AI course — search algorithms, knowledge representation, machine learning, and neural networks, all with real Python code.",
    url: "https://cs50.harvard.edu/ai/",
    license: "Free and open, Harvard OpenCourseWare",
    order: 6,
  },
  {
    slug: "google-ml-crash-course",
    title: "Machine Learning Crash Course",
    author: "Google",
    level: 6,
    subject: "ai",
    description:
      "Google's own free, practical introduction to machine learning concepts with exercises — a solid bridge from 'what is a model' to actually building one.",
    url: "https://developers.google.com/machine-learning/crash-course",
    license: "Free, official Google documentation",
    order: 7,
  },
  {
    slug: "deep-learning-book",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
    level: 8,
    subject: "ai",
    description:
      "The standard graduate-level deep learning textbook, made freely available online by its authors. Dense and mathematical — for once you're past the basics.",
    url: "https://www.deeplearningbook.org/",
    license: "Free to read online, published by MIT Press",
    order: 8,
  },
  {
    slug: "byte-of-python",
    title: "A Byte of Python",
    author: "Swaroop C H",
    level: 3,
    subject: "python",
    description:
      "A concise, well-loved free book that's harder-edged than pure-beginner guides — good for reinforcing intermediate Python idioms and best practices.",
    url: "https://python.swaroopch.com/",
    license: "Creative Commons — free to read online",
    order: 9,
  },
  {
    slug: "d2l-dive-into-deep-learning",
    title: "Dive into Deep Learning",
    author: "Aston Zhang, Zachary C. Lipton, Mu Li, Alexander J. Smola",
    level: 9,
    subject: "ai",
    description:
      "An advanced, interactive deep learning book with runnable code in every chapter — for readers who already know the fundamentals and want to build real models.",
    url: "https://d2l.ai/",
    license: "Free to read online, open-source project",
    order: 10,
  },
];

async function upsertPath(slug: string, data: any, lessons: any[]) {
  const path = await prisma.path.upsert({
    where: { slug },
    update: {},
    create: { slug, ...data },
  });

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    await prisma.lesson.upsert({
      where: { pathId_slug: { pathId: path.id, slug: lesson.slug } },
      update: {},
      create: { pathId: path.id, order: i + 1, ...lesson },
    });
  }

  return path;
}

async function main() {
  const htmlPath = await upsertPath(
    "html-css-foundations",
    {
      title: "HTML & CSS Foundations",
      description: "Build real web pages from structure to styling to responsive layout.",
      tag: "WEB",
      order: 1,
    },
    htmlLessons
  );

  const pythonPath = await upsertPath(
    "python-foundations",
    {
      title: "Python: Zero to Intermediate",
      description: "From your first print statement to classes, files, and a real project.",
      tag: "PY",
      order: 2,
    },
    pythonLessons
  );

  const aiPath = await upsertPath(
    "ai-foundations",
    {
      title: "AI Foundations",
      description: "How models actually work — tokens, training, embeddings, prompting, and their limits.",
      tag: "AI",
      order: 3,
    },
    aiLessons
  );

  for (const book of books) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: {},
      create: book,
    });
  }

  console.log({
    html: `${htmlPath.title} (${htmlLessons.length} lessons)`,
    python: `${pythonPath.title} (${pythonLessons.length} lessons)`,
    ai: `${aiPath.title} (${aiLessons.length} lessons)`,
    books: `${books.length} books`,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
