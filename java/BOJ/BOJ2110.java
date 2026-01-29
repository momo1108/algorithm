import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ2110 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, C;
    static int[] X;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        C = fr.nextInt();
        X = new int[N];

        for (int i = 0; i < N; i++) {
            X[i] = fr.nextInt();
        }

        Arrays.sort(X);
    }

    static boolean possibleDistance(int d){
        int count = 1, lastX = 0;
        for (int i = 1; i < N; i++) {
            if(X[i] - X[lastX] >= d) {
                count++;
                lastX = i;
            }
            if(count >= C) return true;
        }
        return false;
    }

    static int upperBound(){
        int L = 1, R = 1000000000, M = (L + R) / 2;

        while(L <= R){
            M = (L + R) / 2;
            if(possibleDistance(M)){
                L = M + 1;
            } else {
                R = M - 1;
            }
        }

        return M;
    }

    public static void main(String[] args) throws Exception {
        input();
        // 최대 거리(1 ~ 1000000000)를 이분탐색하면 되나?
        // Yes/No 문제는.. 첫 집부터거리를 만족하는 집 찾고, 
        // 그 집부터 만족하는 집 찾고, C 번 반복해서 해결?
        int M = upperBound();
        int answer = 0;

        for (int i = M - 1; i > 0 && i <= M + 1 && i <= 1000000000; i++) {
            if(possibleDistance(i)) answer = i;
        }

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