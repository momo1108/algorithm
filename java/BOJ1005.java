import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ1005 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int T, N, K, W;
    static int[] D, indegree, time;
    static ArrayList<Integer>[] dag;
    static StringBuilder sb = new StringBuilder();

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        K = fr.nextInt();
        D = new int[N+1];
        indegree = new int[N+1];
        time = new int[N+1];
        dag = new ArrayList[N+1];

        for (int i = 1; i <= N; i++) {
            D[i] = fr.nextInt();
            dag[i] = new ArrayList<>();
        }

        int X, Y;
        for (int i = 0; i < K; i++) {
            X = fr.nextInt();
            Y = fr.nextInt();
            dag[X].add(Y);
            indegree[Y]++;
        }

        W = fr.nextInt();
    }

    static void ts(){
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 1; i <= N; i++) {
            if(indegree[i] == 0) {
                queue.add(i);
            }
        }

        while(!queue.isEmpty()){
            int v = queue.poll();
            if(v == W) break;
            
            for(Integer next : dag[v]){
                time[next] = Math.max(time[next], time[v] + D[v]);
                if(--indegree[next] == 0) queue.add(next);
            }
        }

        sb.append(time[W] + D[W]).append('\n');
    }

    public static void main(String[] args) throws Exception {
        T = fr.nextInt();

        while(T-- > 0){
            input();
            ts();
        }

        System.out.println(sb);
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