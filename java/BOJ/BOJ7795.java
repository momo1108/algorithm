import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ7795 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static StringBuilder sb = new StringBuilder();
    static int T, N, M;
    static int[] A, B;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        A = new int[N];
        B = new int[M];
        for (int i = 0; i < N; i++) {
            A[i] = fr.nextInt();
        }
        for (int i = 0; i < M; i++) {
            B[i] = fr.nextInt();
        }
    }

    static int binarySearch(int target){
        int L = 0, R = N - 1;
        int mid = (L + R) / 2;

        while(L <= R){
            if(target >= A[mid]) L = mid + 1;
            else R = mid - 1;
            mid = (L + R) / 2;
        }

        return N - L;
    }

    static void solve(){
        // A 오름차순 정렬 후, B의 원소보다 큰 원소 중 가장 왼쪽 탐색
        Arrays.sort(A);

        int answer = 0;

        for (int b : B) {
            answer += binarySearch(b);
        }

        sb.append(answer).append('\n');
    }

    public static void main(String[] args) throws Exception {
        T = fr.nextInt();

        while (T-- > 0) {
            input();
            solve();
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