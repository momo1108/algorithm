import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ1253 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] A;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new int[N];

        for (int i = 0; i < N; i++) {
            A[i] = fr.nextInt();
        }

        Arrays.sort(A);
    }

    static boolean twoPointer(int targetIndex){
        int L = 0, R = N - 1, sum;
        while(L < R){
            if(L == targetIndex) {
                L++;
                continue;
            }
            if(R == targetIndex) {
                R--;
                continue;
            }

            sum = A[L] + A[R];
            if(sum > A[targetIndex]) R--;
            else if (sum == A[targetIndex]) return true;
            else L++;
        }
        return false;
    }

    public static void main(String[] args) throws Exception {
        input();
        int count = 0;
        for (int i = 0; i < N; i++) {
            if(twoPointer(i)) count++;
        }
        System.out.println(count);
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