import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ10825 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static Student[] S;
    static class Student implements Comparable<Student> {
        public String name;
        public int kor, eng, math;

        public Student(){}
        public Student(String name, int kor, int eng, int math){
            this.name = name;
            this.kor = kor;
            this.eng = eng;
            this.math = math;
        }

        @Override
        public int compareTo(Student s) {
            if(s.kor != kor) return s.kor - kor;
            if(eng != s.eng) return eng - s.eng;
            if(s.math != math) return s.math - math;
            return name.compareTo(s.name);
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        S = new Student[N];
        for(int i = 0; i < N; i++){
            String line = fr.nextLine();
            String[] sline = line.split(" ");
            S[i] = new Student(sline[0], Integer.parseInt(sline[1]), Integer.parseInt(sline[2]), Integer.parseInt(sline[3]));
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        StringBuilder sb = new StringBuilder();

        Arrays.sort(S);

        for (Student s : S) {
            sb.append(s.name).append('\n');
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