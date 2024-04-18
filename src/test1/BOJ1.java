package test1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[] bulb;
    static int[][] Q;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        bulb = new int[N + 1];
        Q = new int[M][3];
        for (int i = 1; i <= N; i++) {
            bulb[i] = fr.nextInt();
        }

        for (int i = 0; i < M; i++) {
            Q[i][0] = fr.nextInt();
            Q[i][1] = fr.nextInt();
            Q[i][2] = fr.nextInt();
        }
    }

    static void solve(){
        for(int[] q : Q){
            if(q[0] == 1){
                bulb[q[1]] = q[2];
            }
            if(q[0] == 2){
                for (int i = q[1]; i <= q[2]; i++) {
                    bulb[i] = 1 - bulb[i];
                }
            }
            if(q[0] == 3){
                for (int i = q[1]; i <= q[2]; i++) {
                    bulb[i] = 0;
                }
            }
            if(q[0] == 4){
                for (int i = q[1]; i <= q[2]; i++) {
                    bulb[i] = 1;
                }
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        solve();

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= N; i++) {
            sb.append(bulb[i]).append(' ');
        }
        System.out.println(sb);
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