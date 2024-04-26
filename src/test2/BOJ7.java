package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ7 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, P, Q, answer = 0;
    static int[] X;
    static ArrayList<Integer>[] groups;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        X = new int[N];

        for (int i = 0; i < N; i++) {
            X[i] = fr.nextInt();
        }

        P = fr.nextInt();
        Q = fr.nextInt();

        groups = new ArrayList[Q + 1];
        for (int i = 0; i < Q + 1; i++) {
            groups[i] = new ArrayList<>();
        }
    }

    static void check(){
        int result = 1;
        for(ArrayList<Integer> group : groups){
            if(group.isEmpty()) return;
            result *= group.stream().reduce(0, (a, b)->a+b);
        }
        answer = Math.max(answer, result);
    }

    static void rec(int index){
        if(index == N) {
            check();
            return;
        }
        for (int group = 0; group < groups.length; group++) {
            groups[group].add(X[index]);
            rec(index + 1);
            groups[group].remove(groups[group].size() - 1);
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        rec(0);
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