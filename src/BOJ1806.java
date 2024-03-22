import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1806 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, S;
    static int[] A, A2;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        S = fr.nextInt();
        A = new int[N];
        A2 = new int[N+1];

        int num;
        for (int i = 0; i < N; i++) {
            num = fr.nextInt();
            A[i] = num;
            A2[i+1] = num;
        }
    }

    static void twoPointer(){
        int L = 0, R = 0, sum = A[0], answer = Integer.MAX_VALUE;

        // 내가 짠 로직
        while(L < N) {
            if(sum < S) {
                if(++R >= N) break;
                sum += A[R];
            } else {
                answer = Math.min(answer, R - L + 1);
                if(L == R) break; // 여기서 L이 R보다 커지는 경우는 걸러진다.
                sum -= A[L++];
            }
        }
        System.out.println(answer >= 100000 ? 0 : answer);

        // 강사가 짠 로직(For문 활용)
        // 확실히 더 직관적이긴 하다.
        int right = 0, sum2 = 0, answer2 = N + 1;
        for (int left = 1; left <= N; left++) {
            // L - 1 을 구간에서 제외하기
            sum2 -= A2[left - 1];
            
            // R 을 옮길 수 있을 때 까지 옮기기
            while (right + 1 <= N && sum2 < S)
                sum2 += A2[++right];
            
            // [L ... R] 의 합, 즉 sum이 조건을 만족하면 정답 갱신하기
            if (sum2 >= S)
                answer2 = Math.min(answer2, right - left + 1);
        }
        // ans 값을 보고 불가능 판단하기
        if (answer2 == N + 1)
            answer2 = 0;
        System.out.println(answer2);
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