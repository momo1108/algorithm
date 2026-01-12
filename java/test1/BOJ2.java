package test1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] A;
    static boolean[] notPrime;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new int[N];
        notPrime = new boolean[1000001];
        for (int i = 0; i < N; i++) {
            A[i] = fr.nextInt();
        }
    }

    static void solve(){
        notPrime[0] = true;
        notPrime[1] = true;
        for (int i = 2; i <= 1000000; i++) {
            if(notPrime[i]) continue;
            int times = 2;
            while(i * times <= 1000000){
                notPrime[i * times++] = true;
            }
        }

        long answer = 1;

        for(int a : A){
            if(!notPrime[a]) answer *= a;
        }

        System.out.println(answer == 1? -1 : answer);
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