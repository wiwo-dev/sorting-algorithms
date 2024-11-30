# Sorting Algorithms Visualizer

This project is visualising how sorting algorithms work. A sorting algorithm is an algorithm that puts elements of a list into order. There are many different sorting algorithms and this project is meant to visualise how some of those work. It helps to understand each step. Users can pause the visualization at any moment and go both forward and backward step by step.

![screenshot](https://wiwo.dev/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F9lwq5y1zam6x%2F5ILOpietDVHTQeJMsnm5Zf%2F66d36d9e5b54a04137327a7f1111d0c0%2Fsorting_visualizer.jpg&w=1080&q=75)

## Implemented algorithms:

- Bubble sort
- Selection sort
- Insertion sort
- Merge sort
- Quick sort

## Controls

While other sorting visualisers can be found online, I couldn’t find any that allowed users to pause and manually navigate each step. As a result, I implemented it and believe it will help to understand how each sorting method is performed.

Furthermore, the animation can be sped up or slowed down during playback.

![controls](https://wiwo.dev/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F9lwq5y1zam6x%2F1nZ0gf9nKfgvNAsmqpky2w%2F2157606157aeb0dd3afb9afde808191c%2Fintro.jpg&w=1080&q=75)

## Tech

To make the animations visually attractive I used Framer Motion as the animation library. It simulates spring physics for realistic motion. To keep the algorithmic layer separate from visualisation it works in a way that the given set is first sorted by the algorithm and each step is saved in an array that later on is iterated with Framer Motion to draw the animation.

## Interface and design

The user interface is built with Chakra UI library.

At first, a user sees a modal with detailed instructions.

![instruction](https://wiwo.dev/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F9lwq5y1zam6x%2F1nZ0gf9nKfgvNAsmqpky2w%2F2157606157aeb0dd3afb9afde808191c%2Fintro.jpg&w=1080&q=75)
