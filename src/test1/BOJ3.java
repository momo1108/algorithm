package test1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ3 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, X;
    static int[] A;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new int[N];
        for (int i = 0; i < N; i++) {
            A[i] = fr.nextInt();
        }
        X = fr.nextInt();
    }

    static void solve(){
        // 먼저 X의 약수들의 배수들로 서로소 체크 배열을 채워넣자.
        // true 이면 X 와 공약수를 가지는 수 라는 뜻.
        boolean[] check = new boolean[1000001];

        
        for (int i = 2; i <= X; i++) {
            if(X % i == 0 && !check[i]){
                int times = 1;
                while(i * times <= 1000000){
                    check[i * times++] = true;
                }
            }
        }

        double answer = 0;
        int count = 0;

        for(int a : A){
            if(check[a]) continue;
            count++;
            answer += (double)a;
        }
        answer /= (double)count;

        System.out.println(answer);
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