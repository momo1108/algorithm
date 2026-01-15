const fs = require("fs");
const path = require("path");

const usageMessage = `Usage: npm run <java | py | js> <platform> <problem_number>`;

const lang = process.argv[2].toLowerCase();

if (!lang || !["java", "py", "js"].includes(lang)) {
  console.log("Please provide a valid language: java, py, or js");
  console.log(usageMessage);
  process.exit(1);
}

const algoPlatform = process.argv[3].toUpperCase();
if (
  !algoPlatform ||
  !["BOJ", "LEETCODE", "PROGRAMMERS"].includes(algoPlatform)
) {
  console.log(
    "Please provide the name of website platform (e.g., BOJ, LeetCode, Programmers - ignore case)."
  );
  console.log(usageMessage);
  process.exit(1);
}

const pNum = parseInt(process.argv[4]);
if (!pNum || isNaN(pNum)) {
  console.log("Please provide the problem number.");
  console.log(usageMessage);
  process.exit(1);
}

const fileName = `${algoPlatform}${pNum}.${lang}`;
const filePath = `${path.join(__dirname, lang)}/${fileName}`;

const JS_BOILERPLATE = `const filePath = process.platform === "linux" ? "/dev/stdin" : "${path.join(__dirname, "data").replaceAll("\\", "/")}/${algoPlatform}${pNum}.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\\n").map(line => line.trim());
`;

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

const boilerplateMap = {
  'js': JS_BOILERPLATE,
  'java': JAVA_BOILERPLATE,
  'py': PYTHON_BOILERPLATE
};

const completeMessage = `${fileName} file has been created with ${lang} boilerplate code.`

try {
  fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
  console.log('File Already Exists!');
  return;
} catch (err) {
  console.log('Creating New Files!');

  fs.writeFileSync(
    filePath,
    boilerplateMap[lang]
  );

  if(lang === "js" && algoPlatform === "BOJ"){
    fs.writeFileSync(
      `${path.join(__dirname, "data")}/${algoPlatform}${pNum}.txt`,
      ""
    );
  }
  
  console.log(completeMessage);
}