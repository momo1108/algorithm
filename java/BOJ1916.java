import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class BOJ1916 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M, S, D;
    static int[] dist;
    static ArrayList<Bus>[] E;

    static class Bus implements Comparable<Bus> {
        int d, w;

        public Bus(int d, int w){
            this.d = d;
            this.w = w;
        }

        @Override
        public int compareTo(Bus o) {
            return this.w - o.w;
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        dist = new int[N+1];
        E = new ArrayList[N+1];

        for (int i = 1; i <= N; i++) {
            E[i] = new ArrayList<>();
        }

        int start, end, weight;
        for (int i = 0; i < M; i++) {
            start = fr.nextInt();
            end = fr.nextInt();
            weight = fr.nextInt();
            E[start].add(new Bus(end, weight));
        }

        S = fr.nextInt();
        D = fr.nextInt();

        for (int i = 1; i <= N; i++) {
            dist[i] = i == S? 0 : Integer.MAX_VALUE;
        }
    }

    static void dijk(){
        PriorityQueue<Bus> queue = new PriorityQueue<>();
        queue.add(new Bus(S, 0));

        while(!queue.isEmpty()){
            Bus b = queue.poll();
            if(b.w > dist[b.d]) continue;

            for(Bus next : E[b.d]){
                if(b.w + next.w >= dist[next.d]) continue;
                dist[next.d] = b.w + next.w;
                queue.add(new Bus(next.d, dist[next.d]));
            }
        }

        System.out.println(dist[D]);
    }

    public static void main(String[] args) throws Exception {
        input();
        dijk();
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