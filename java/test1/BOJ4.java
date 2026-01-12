package test1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ4 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, X;
    static int[] visit;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        X = fr.nextInt();
        visit = new int[N];
        for (int i = 0; i < N; i++) {
            visit[i] = fr.nextInt();
        }
    }

    static void solve(){
        int max = 0, count = 0;

        int sum = 0;
        for (int i = 0; i < X; i++) sum += visit[i];
        if(sum > max) {
            max = sum;
            count = 1;
        }

        for (int i = 1; i + X <= N; i++) {
            sum -= visit[i-1];
            sum += visit[i + X - 1];
            if(sum > max) {
                max = sum;
                count = 1;
            } else if(sum == max) count++;
        }

        System.out.println(max == 0? "SAD" : max);
        if(max > 0) System.out.println(count);
    }

    public static void main(String[] args) throws Exception {
        input();
        solve();
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