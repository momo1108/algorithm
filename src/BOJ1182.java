import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1182 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, S, answer = 0, sum = 0;
    static boolean[] visit;
    static int[] A;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        S = fr.nextInt();
        // 합이 0인 경우, 아무것도 안쓰는 부분집합이 정답으로 포함되기 때문에 -1 해줌.
        // 이걸 진 부분집합만 사용한다고 함.
        if(S == 0) answer--; 
        visit = new boolean[N+1];
        A = new int[N+1];
        for(int i = 1; i <= N; i++){
            A[i] = fr.nextInt();
        }
    }

    static void rec(int k, int sum){
        if(k > N) {
            if(sum == S) answer++;
        }
        else {
            rec(k+1, sum + A[k]); // k번째 숫자 포함
            rec(k+1, sum); // k번째 숫자 제외
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        rec(1, 0);
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