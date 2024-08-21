import { v4 as uuidv4 } from "uuid";

export interface TestCase {
  _id: string;
  input: string;
  output: string;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  instructions: string;
  isSolved: boolean;
  isOnGoing: boolean;
  starterCode: string;
  language: string;
  testCases: TestCase[];
  tags: string[];
  difficulty: string;
  type: string;
}

export const challenges: Challenge[] = [
  {
    _id: uuidv4(),
    title: "String Reversal",
    description: "Reverse the input string.",
    instructions:
      "Write a function that takes a string as input and returns the string reversed.",
    isSolved: false,
    isOnGoing: true,
    starterCode: "function reverseString(str) {\n  // Your code here\n}",
    language: "python",
    testCases: [
      { _id: uuidv4(), input: "'hello'", expected: "'olleh'" },
      { _id: uuidv4(), input: "'world'", expected: "'dlrow'" },
    ],
    tags: ["string", "easy"],
    difficulty: "easy",
    type: "algorithm",
  },
  {
    _id: uuidv4(),
    title: "Sum of Two Numbers",
    description: "Return the sum of two numbers.",
    instructions:
      "Write a function that takes two numbers as arguments and returns their sum.",
    isSolved: true,
    isOnGoing: false,
    starterCode: "function sum(a, b) {\n  // Your code here\n}",
    language: "javascript",
    testCases: [
      { _id: uuidv4(), input: "2, 3", expected: "5" },
      { _id: uuidv4(), input: "10, 20", expected: "30" },
    ],
    tags: ["math", "easy"],
    difficulty: "medium",
    type: "math",
  },
  {
    _id: uuidv4(),
    title: "Palindrome Checker",
    description: "Check if a string is a palindrome.",
    instructions:
      "Write a function that checks whether a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).",
    isSolved: false,
    isOnGoing: true,
    starterCode: "function isPalindrome(str) {\n  // Your code here\n}",
    language: "javascript",
    testCases: [
      { _id: uuidv4(), input: "'racecar'", expected: "true" },
      { _id: uuidv4(), input: "'hello'", expected: "false" },
    ],
    tags: ["string", "math"],
    difficulty: "medium",
    type: "algorithm",
  },
  {
    _id: uuidv4(),
    title: "FizzBuzz",
    description: "Print numbers with FizzBuzz logic.",
    instructions:
      "Write a function that prints the numbers from 1 to 100. But for multiples of three, print 'Fizz' instead of the number, and for the multiples of five, print 'Buzz'. For numbers which are multiples of both three and five, print 'FizzBuzz'.",
    isSolved: false,
    isOnGoing: false,
    starterCode: "function fizzBuzz() {\n  // Your code here\n}",
    language: "python",
    testCases: [
      { _id: uuidv4(), input: "15", expected: "'FizzBuzz'" },
      { _id: uuidv4(), input: "9", expected: "'Fizz'" },
    ],
    tags: [],
    difficulty: "easy",
    type: "logic",
  },

  {
    _id: uuidv4(),
    title: "Prime Number Checker",
    description: "Check if a number is prime.",
    instructions:
      "Write a function in Go that determines whether a given number is a prime number. A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers.",
    isSolved: false,
    isOnGoing: true,
    starterCode: `package main

import "fmt"

func isPrime(n int) bool {
  if n <= 1 {
    return false
  }
  for i := 2; i*i <= n; i++ {
    if n % i == 0 {
      return false
    }
  }
  return true
}

func main() {
  fmt.Println(isPrime(7)) // true
  fmt.Println(isPrime(10)) // false
}
`,
    language: "go",
    testCases: [
      { _id: uuidv4(), input: "7", expected: "true" },
      { _id: uuidv4(), input: "10", expected: "false" },
      { _id: uuidv4(), input: "13", expected: "true" },
      { _id: uuidv4(), input: "20", expected: "false" },
    ],
    tags: ["number", "medium"],
    difficulty: "medium",
    type: "algorithm",
  },
];
