import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ1068 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, D, R;
    static int[] P;
    static ArrayList<Integer>[] tree;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        P = new int[N];
        tree = new ArrayList[N];

        int p;
        for (int i = 0; i < N; i++) {
            tree[i] = new ArrayList<>();
            p = fr.nextInt();
            P[i] = p;
        }

        D = fr.nextInt();

        for (int i = 0; i < N; i++) {
            if(P[i]>=0 && i != D) tree[P[i]].add(i);
            if(P[i]==-1) R = i;
        }
    }

    static int dfs(int node){
        if(tree[node].size() == 0) return 1;

        int count = 0;
        for(Integer c : tree[node]){
            count += dfs(c);
        }
        return count;
    }

    public static void main(String[] args) throws Exception {
        input();
        System.out.println(D == R? 0 : dfs(R));
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