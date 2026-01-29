import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ11652 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, maxCount = 0;
    static long maxValue;
    static long[] A;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new long[N];
        for (int i = 0; i < N; i++) {
            A[i] = fr.nextLong();
        }
    }

    public static void main(String[] args) throws Exception {
        input();

        Arrays.sort(A);

        int count = 1;
        maxCount = 1;
        maxValue = A[0];

        for (int i = 1; i < N; i++) {
            if(A[i] != A[i-1]) {
                count = 1;
            } else {
                if(++count > maxCount) {
                    maxValue = A[i];
                    maxCount = count;
                }
            }
        }

        System.out.println(maxValue);
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