import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ13144 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] A;
    static int[] visit;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new int[N];
        visit = new int[N+1];

        for (int i = 0; i < N; i++) {
            A[i] = fr.nextInt();
        }
    }

    static void twoPointer(){
        long count = 0;

        for(int L = 0, R = -1; L < N; L++){
            // 각 L의 위치마다 가능한 R을 끝까지 옮긴다.
            // L부터 시작하는 부분집합들의 개수를 count에 누적
            // 위 작업이 반복되며 L이 마지막위치까지 간다.
            while(R + 1 < N && visit[A[R+1]] == 0) visit[A[++R]]++;
            // System.out.println("L to R : " + L + " " + R);
            // System.out.println("visit 123 : " + visit[1] + " " + visit[2] + " " + visit[3]);
            count += (R - L + 1);
            visit[A[L]]--;
        }
        System.out.println(count);
    }

    public static void main(String[] args) throws Exception {
        input();
        twoPointer();
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