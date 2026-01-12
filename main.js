const fs = require("fs");
const path = require("path");

const JAVA_BOILERPLATE = `import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();

    // 입력 함수
    static void input(){
        
    }

    public static void main(String[] args) throws Exception {
        input();
    }

    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        public FastReader(String s) throws FileNotFoundException {
            br = new BufferedReader(new FileReader(new File(s)));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }

        double nextDouble() {
            return Double.parseDouble(next());
        }

        String nextLine() {
            String str = "";
            try {
                str = br.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return str;
        }
    }
}`;

const PYTHON_BOILERPLATE = `import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline

`;

const JS_BOILERPLATE = `const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");
`;

const usageMessage = `Usage: npm run <java | python | js> <platform> <problem_number>`;

const lang = process.argv[2];

if (!lang || !["java", "python", "js"].includes(lang.toLowerCase())) {
  console.log("Please provide a valid language: java, python, or js");
  console.log(usageMessage);
  process.exit(1);
}

const platform = process.argv[3];
if (
  !platform ||
  !["BOJ", "LEETCODE", "PROGRAMMERS"].includes(platform.toUpperCase())
) {
  console.log(
    "Please provide the platform name (e.g., BOJ, LeetCode, Programmers - ignore case)."
  );
  console.log(usageMessage);
  process.exit(1);
}

const number = parseInt(process.argv[4]);
if (!number || isNaN(number)) {
  console.log("Please provide the problem number.");
  console.log(usageMessage);
  process.exit(1);
}

if (lang.toLowerCase() === "java") {
  fs.writeFileSync(
    `${path.join(__dirname, "java")}/${process.argv[3]}${process.argv[4]}.java`,
    JAVA_BOILERPLATE
  );
  console.log("BOJ.java file has been created with Java boilerplate code.");
} else if (lang.toLowerCase() === "python") {
  fs.writeFileSync(
    `${path.join(__dirname, "python")}/${process.argv[3]}${process.argv[4]}.py`,
    PYTHON_BOILERPLATE
  );
  console.log("BOJ.py file has been created with Python boilerplate code.");
} else if (lang.toLowerCase() === "js") {
  fs.writeFileSync(
    `${path.join(__dirname, "js")}/${process.argv[3]}${process.argv[4]}.js`,
    JS_BOILERPLATE
  );
  console.log("BOJ.js file has been created with JavaScript boilerplate code.");
}
