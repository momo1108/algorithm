import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ1068_sol {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, D, R;
    static int[] P, leaf;
    static ArrayList<Integer>[] tree;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        P = new int[N];
        leaf = new int[N];
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

    static void dfs(int node){
        if(tree[node].isEmpty()) leaf[node] = 1;

        for(Integer c : tree[node]){
            dfs(c);
            leaf[node] += leaf[c];
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        dfs(R);
        System.out.println(D == R? 0 : leaf[R]);
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