# Rust 后端开发圣经 · mdBook

完整第0—47章，可编辑Markdown、mdBook配置、已构建网页及原配套源码下载。

## 直接阅读

解压后双击 `打开电子书.html`，或打开 `book/index.html`。已构建的网页无需安装Rust或mdBook；书内可下载完整项目源码与验证记录。

## 编辑与构建

章节源文件在 `src/chapters/ch00.md` 到 `ch47.md`，目录在 `src/SUMMARY.md`，设置在 `book.toml`。本次使用mdBook 0.5.4构建，无第三方预处理器。

如尚未安装mdBook，安装后在本目录运行：

```sh
cargo install mdbook --version 0.5.4 --locked
mdbook build
mdbook serve --open
```

`mdbook build`重新生成book/；`mdbook serve --open`提供本地预览。不要直接编辑book/中的生成文件。

## GitHub Pages 自动部署

仓库通过 GitHub Actions 构建并发布电子书。推送到 `main` 分支后，工作流使用 mdBook 0.5.4 构建 `book/`，随后部署到 GitHub Pages；也可以在 Actions 页面手动运行工作流。

`book/` 是本地构建产物，不提交到 Git。首次部署需将仓库 Settings → Pages → Source 设置为 GitHub Actions。

## 转换范围

PDF第0—5章按原字形与表格网格恢复，移除显示行号并合并视觉续行；第6—47章来自匹配的校订源稿，逐章代码体保持不变。正文不改写为新的业务版本。verification/保存逐页提取、代码体指纹和构建核对记录。

书内运行按钮已关闭，因为许多示例依赖多文件工程或外部服务。代码可复制；按正文前提使用对应章节检查点运行。原书验证记录与这次格式构建检查分开说明。

网页支持中文词组及英文搜索，可复制代码并切换主题。转换后共48章、1372个代码块，已逐块核对网页文本；4470个本地链接与资源引用检查通过。首次搜索会加载本地全书索引。
