import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ1697 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, K;
    static boolean[] visit;
    static int[] dist;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        K = fr.nextInt();
        visit = new boolean[100001];
        dist = new int[100001];
    }

    static void bfs(){
        Queue<Integer> q = new LinkedList<>();
        q.add(N);
        visit[N] = true;
        dist[N] = 0;

        int[] dir;

        while(!q.isEmpty()){
            int x = q.poll();
            if(x == K) {
                System.out.println(dist[x]);
                break;
            }

            dir = new int[]{x - 1, x + 1, x * 2};
            for(int next : dir){
                if(next >= 0 && next <= 100000 && !visit[next]){
                    q.add(next);
                    visit[next] = true;
                    dist[next] = dist[x] + 1;
                }
            }
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        bfs();
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