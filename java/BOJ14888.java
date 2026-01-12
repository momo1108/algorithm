import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ14888 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] A;
    static int[] O = new int[4]; // +, -, *, /
    static int[] ops; // 연산자 숫자 저장
    static int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new int[N+1];
        ops = new int[N];
        for(int i = 1; i <= N; i++) {
            A[i] = fr.nextInt();
        }
        for(int i = 0; i < 4; i++){
            O[i] = fr.nextInt();
        }
    }
    
    static void calc(){
        int answer = A[1];

        for(int num = 2; num <= N; num++){
            if(ops[num-1] == 0){
                answer += A[num];
            } else if(ops[num-1] == 1){
                answer -= A[num];
            } else if(ops[num-1] == 2){
                answer *= A[num];
            } else {
                answer /= A[num];
            }
        }

        min = Integer.min(answer, min);
        max = Integer.max(answer, max);
    }

    static void rec(int k){
        if(k >= N) calc();
        else {
            for(int op = 0; op < 4; op++){
                if(O[op] == 0) continue;
                O[op]--;
                ops[k] = op;
                rec(k+1);
                O[op]++;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        // N-1 개를 순서를 정해 나열한 것 보다 적음
        // (N-1)! = 최대 10! = 3628800
        // 여기에 최종 계산 횟수는 연산자개수 -1 을 곱한다.
        // 36288000
        rec(1);

        System.out.println(max);
        System.out.println(min);
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