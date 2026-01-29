import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ2470 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, min = Integer.MAX_VALUE;
    static int[] answer = new int[]{0, 0};
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

    static void binarySearch(int f){
        int L = 0, R = N - 1, M = (L + R) / 2;

        while(L <= R) {
            M = (L + R) / 2;
            if(fluids[M] + f == 0) {
                answer[0] = fluids[M];
                answer[1] = f;
                return;
            } else if(fluids[M] + f > 0) {
                R = M - 1;
            } else { 
                L = M + 1;
            }
        }
        // M - 1, M, M + 1 위치 확인
        // 이 중 0 ~ N - 1 범위만 추리고, f와 같은 위치 걸러야 함.
        for (int i = M - 1; i <= M + 1; i++) {
            if(i < 0 || i >= N) continue;
            if(fluids[i] == f) continue;
            if(Math.abs(fluids[i] + f) < min) {
                min = Math.abs(fluids[i] + f);
                answer[0] = fluids[i];
                answer[1] = f;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();

        for (int i = 0; i < N; i++) {
            binarySearch(fluids[i]);
            if(answer[0] + answer[1] == 0) break;
        }


        System.out.println(answer[0] < answer[1] ?
        answer[0] + " " + answer[1] : 
        answer[1] + " " + answer[0]);
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