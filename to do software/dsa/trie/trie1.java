public class trie1 {
    static class Node {
        Node[] children = new Node[26];
        boolean endofword = false;
    }
    static Node root = new Node();
    public static void insert(String str){
        Node curr=root;
        for(int i=0;i<str.length();i++){
            int idx = str.charAt(i) - 'a';
            if(curr.children[idx]==null){
                //insert new ele to trie
                curr.children[idx]=new Node();
            }
            curr=curr.children[idx];
        }
        curr.endofword=true;
    }
    public static boolean search(String str){
        Node curr=root;
        for(int i=0;i<str.length();i++){
            int idx = str.charAt(i) - 'a';
            if(curr.children[idx]==null){
                return false;
            }
            curr=curr.children[idx];
        }
        return curr.endofword;
    }
    public static void main(String[] args) {
        insert("apple");
        insert("app");

        System.out.println(search("apple"));   // true
        System.out.println(search("app"));     // false
        System.out.println(search("banana"));  // false
    }
}
