package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ5 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static String S;
    static int M;
    static Word[] W;
    static class Word{
        String word;
        int score;

        public Word(String w, int s){
            this.word = w;
            this.score = s;
        }
    }

    // 입력 함수
    static void input(){
        S = fr.nextLine();
        M = fr.nextInt();
        W = new Word[M];

        String line;
        String[] sl;
        for (int i = 0; i < M; i++) {
            line = fr.nextLine();
            sl = line.split(" ");
            W[i] = new Word(sl[0], Integer.parseInt(sl[1]));
        }
    }
    
    static void dp(){
        int[] Dy = new int[S.length() + 1];

        for (int i = 1; i <= S.length(); i++) {
            Dy[i] = Math.max(Dy[i - 1] + 1, Dy[i]);

            for(Word w : W){
                int wordEnd = i + w.word.length() - 1;
                if(wordEnd > S.length()) continue;
                if(w.word.equals(S.substring(i - 1, wordEnd))) Dy[wordEnd] = Math.max(Dy[wordEnd], Dy[i - 1] + w.score);
            }
        }
        System.out.println(Dy[S.length()]);
    }

    public static void main(String[] args) throws Exception {
        input();
        dp();
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
}