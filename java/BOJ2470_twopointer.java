import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ2470_twopointer {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] fluids;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        fluids = new int[N];

        for (int i = 0; i < N; i++) {
            fluids[i] = fr.nextInt();
        }

        Arrays.sort(fluids);
    }

    static int[] twoPointer(){
        int L = 0, R = N - 1, sum, absSum, min = Integer.MAX_VALUE;
        int[] answer = new int[2];

        while(L < R) {
            sum = fluids[L] + fluids[R];
            absSum = Math.abs(sum);
            if(sum == 0) {
                answer[0] = fluids[L];
                answer[1] = fluids[R];
                break;
            }
            if(absSum < min) {
                answer[0] = fluids[L];
                answer[1] = fluids[R];
                min = absSum;
            }
            if(sum < 0) L++;
            else R--;
        }

        return answer;
    }

    public static void main(String[] args) throws Exception {
        input();
        int[] answer = twoPointer();
        System.out.println(answer[0] + " " + answer[1]);
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