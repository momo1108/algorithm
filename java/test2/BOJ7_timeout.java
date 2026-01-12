package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ7_timeout {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, P, Q, answer = 0;
    static ArrayList<Integer> X;
    static int[] operator;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        X = new ArrayList<>();
        operator = new int[2];

        for (int i = 0; i < N; i++) {
            X.add(fr.nextInt());
        }

        P = fr.nextInt();
        Q = fr.nextInt();
        operator[0] = P;
        operator[1] = Q;
    }

    static void rec(ArrayList<Integer> x, int[] o){
        if(x.size() == 1){
            answer = Math.max(answer, x.get(0));
        }

        for (int i = 0; i < x.size(); i++) {
            for (int j = i + 1; j < x.size(); j++) {
                int n1, n2;
                n1 = x.remove(j);
                n2 = x.remove(i);
                if(o[0] > 0){
                    o[0]--;
                    x.add(n1 + n2);
                    rec(x, o);
                    o[0]++;
                    x.remove(x.size() - 1);
                }
                if(o[1] > 0){
                    o[1]--;
                    x.add(n1 * n2);
                    rec(x, o);
                    o[1]++;
                    x.remove(x.size() - 1);
                }
                x.add(i, n2);
                x.add(j, n1);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        rec(X, operator);
        System.out.println(answer);
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