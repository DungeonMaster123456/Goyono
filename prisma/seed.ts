import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const python = await prisma.path.upsert({
    where: { slug: "python-foundations" },
    update: {},
    create: {
      slug: "python-foundations",
      title: "Python Foundations",
      description: "Variables, control flow, functions, and your first real programs.",
      tag: "PY",
      order: 1,
      lessons: {
        create: [
          {
            slug: "hello-world",
            title: "Hello, world",
            order: 1,
            language: "python",
            starterCode: 'print("hello, world")\n',
            content:
              "# Hello, world\n\nEvery language starts here. `print()` writes text to the terminal.\n\nRun the starter code, then change the message and run it again.",
          },
          {
            slug: "variables",
            title: "Variables and types",
            order: 2,
            language: "python",
            starterCode: 'name = "goyono"\nyear = 2026\nprint(name, year)\n',
            content:
              "# Variables and types\n\nA variable is a name attached to a value. Python figures out the type for you: strings, integers, floats, booleans.",
          },
          {
            slug: "control-flow",
            title: "If, else, and loops",
            order: 3,
            language: "python",
            starterCode:
              "for i in range(5):\n    if i % 2 == 0:\n        print(i, \"even\")\n    else:\n        print(i, \"odd\")\n",
            content:
              "# Control flow\n\n`if`/`else` branches on a condition. `for` loops repeat over a range or a collection.",
          },
          {
            slug: "functions",
            title: "Functions",
            order: 4,
            language: "python",
            starterCode:
              "def greet(name):\n    return f\"hey, {name}\"\n\nprint(greet(\"world\"))\n",
            content:
              "# Functions\n\nA function packages up logic you can reuse. `def` defines it, `return` sends a value back.",
          },
        ],
      },
    },
  });

  const js = await prisma.path.upsert({
    where: { slug: "javascript-basics" },
    update: {},
    create: {
      slug: "javascript-basics",
      title: "JavaScript Basics",
      description: "The language of the web — syntax, functions, and the DOM.",
      tag: "JS",
      order: 2,
      lessons: {
        create: [
          {
            slug: "hello-world",
            title: "Hello, world",
            order: 1,
            language: "javascript",
            starterCode: 'console.log("hello, world");\n',
            content: "# Hello, world\n\n`console.log()` prints to the terminal in JavaScript.",
          },
          {
            slug: "variables",
            title: "let, const, and types",
            order: 2,
            language: "javascript",
            starterCode: 'const name = "goyono";\nlet year = 2026;\nconsole.log(name, year);\n',
            content:
              "# Variables\n\n`const` for values that don't change, `let` for ones that do. Avoid `var`.",
          },
          {
            slug: "functions",
            title: "Functions and arrow syntax",
            order: 3,
            language: "javascript",
            starterCode:
              "const greet = (name) => `hey, ${name}`;\nconsole.log(greet(\"world\"));\n",
            content: "# Functions\n\nArrow functions are the modern default for short functions.",
          },
        ],
      },
    },
  });

  const ai = await prisma.path.upsert({
    where: { slug: "ai-foundations" },
    update: {},
    create: {
      slug: "ai-foundations",
      title: "AI Foundations",
      description: "How models actually work, from tokens to training.",
      tag: "AI",
      order: 3,
      lessons: {
        create: [
          {
            slug: "what-is-a-model",
            title: "What is a model?",
            order: 1,
            language: "python",
            starterCode:
              "# a toy 'model': a lookup table\nmodel = {\"hi\": \"hello!\", \"bye\": \"see you!\"}\nprint(model.get(\"hi\"))\n",
            content:
              "# What is a model?\n\nAt the smallest scale, a model is a function that maps inputs to outputs. Real models learn that mapping from data instead of it being hardcoded.",
          },
          {
            slug: "tokens",
            title: "Tokens and tokenization",
            order: 2,
            language: "python",
            starterCode:
              "text = \"goyono teaches code\"\ntokens = text.split()\nprint(tokens)\n",
            content:
              "# Tokens\n\nModels don't read raw text — they read tokens, chunks of text mapped to numbers.",
          },
        ],
      },
    },
  });

  console.log({ python: python.id, js: js.id, ai: ai.id });
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
