import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2805 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static long sum;
    static int[] trees;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        trees = new int[N];

        for (int i = 0; i < N; i++) {
            trees[i] = fr.nextInt();
        }
    }

    static long treeSum(int h){
        long sum = 0;

        for (int i = 0; i < N; i++) {
            if(trees[i] > h) sum += (trees[i] - h);
        }

        return sum;
    }

    static int upperBound(){
        int L = 1, R = 1000000000, Mid = (L + R) / 2;

        while(L <= R){
            Mid = (L + R) / 2;
            if(treeSum(Mid) < M) {
                R = Mid - 1;
            } else {
                L = Mid + 1;
            }
        }

        return Mid;
    }

    public static void main(String[] args) throws Exception {
        input();
        // 높이의 upper bound 를 찾아야 한다.
        // 높이를 이분해가며 설정하는데, 
        // M 미터 이상 가능한지 Yes / No 결정한다.
        // Yes / No 결정은 N 의 시간복잡도
        // 따라서 전체 시간복잡도는 N log 최대높이 = 3100만정도
        int Mid = upperBound();
        long answer = 0;
        for (int i = Mid - 1; i >= 0 && i <= Mid + 1; i++) {
            if(treeSum(i) >= M) answer = i;
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