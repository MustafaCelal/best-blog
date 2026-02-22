import Alpine from 'alpinejs';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

window.adminApp = () => {
    return {
        editor: null,
        post: {
            title: '',
            content: '',
            slug: '',
            status: 'draft'
        },
        init() {
            this.editor = new Editor({
                element: document.querySelector('#editor-content'),
                extensions: [
                    StarterKit,
                ],
                content: '<p>Merhaba Tiptap!</p>',
                onUpdate: ({ editor }) => {
                    this.post.content = editor.getHTML();
                },
            });
        },
        async savePost() {
            try {
                // simple slug generator
                this.post.slug = this.post.title
                    .toLowerCase()
                    .replace(/ /g, '-')
                    .replace(/[^\w-]+/g, '');

                const record = await pb.collection('posts').create({
                    ...this.post,
                    content: this.editor.getHTML()
                });

                alert('Yazı Başarıyla Kaydedildi!');
                console.log('Saved:', record);
            } catch (error) {
                console.error('Save error:', error);
                alert('Hata: ' + error.message);
            }
        }
    }
}

window.Alpine = Alpine;
Alpine.start();
